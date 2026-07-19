import { db } from '@nuxthub/db'
import { and, eq, gte, lte, sql } from 'drizzle-orm'
import { tasks } from '../db/schema'

export async function findOrCreateTask(db: typeof import('@nuxthub/db').db, name: string) {
  const existing = await db.query.tasks.findFirst({
    where: sql`lower(${tasks.name}) = lower(${name})`
  })
  if (existing) return existing

  const [created] = await db.insert(tasks).values({ name }).returning()
  return created!
}

export function getTodayRange() {
  const from = new Date()
  from.setHours(0, 0, 0, 0)
  const to = new Date()
  to.setHours(23, 59, 59, 999)
  return { from, to }
}

export function getWeekRange(reference = new Date()) {
  const daysSinceMonday = (reference.getDay() + 6) % 7

  const from = new Date(reference)
  from.setDate(reference.getDate() - daysSinceMonday)
  from.setHours(0, 0, 0, 0)

  const to = new Date(from)
  to.setDate(from.getDate() + 6)
  to.setHours(23, 59, 59, 999)

  return { from, to }
}

export async function getTasksInRange(from: Date, to: Date) {
  const rows = await db.query.tasks.findMany({
    with: {
      timeEntries: {
        where: (timeEntries) => and(gte(timeEntries.startTime, from), lte(timeEntries.startTime, to)),
        orderBy: (timeEntries, { asc }) => asc(timeEntries.startTime)
      }
    }
  })

  return rows.filter((task) => task.timeEntries.length > 0).map(toTaskDto)
}

export async function getTaskInRange(taskId: number, from: Date, to: Date) {
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
    with: {
      timeEntries: {
        where: (timeEntries) => and(gte(timeEntries.startTime, from), lte(timeEntries.startTime, to)),
        orderBy: (timeEntries, { asc }) => asc(timeEntries.startTime)
      }
    }
  })

  return task ? toTaskDto(task) : null
}

export async function getTasksByDayInRange(from: Date, to: Date) {
  const weekTasks = await getTasksInRange(from, to)

  const days: { date: string; tasks: Awaited<ReturnType<typeof getTasksInRange>> }[] = []
  const cursor = new Date(from)
  cursor.setHours(0, 0, 0, 0)

  while (cursor <= to) {
    const dayStart = new Date(cursor)
    const dayEnd = new Date(cursor)
    dayEnd.setHours(23, 59, 59, 999)

    const dayTasks = weekTasks
      .map((task) => ({
        ...task,
        sessions: task.sessions.filter((session) => session.startTime >= dayStart && session.startTime <= dayEnd)
      }))
      .filter((task) => task.sessions.length > 0)

    days.push({ date: toISODate(dayStart), tasks: dayTasks })
    cursor.setDate(cursor.getDate() + 1)
  }

  return days
}

function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toTaskDto(task: { id: number; name: string; timeEntries: { startTime: Date; endTime: Date | null }[] }) {
  return {
    id: String(task.id),
    name: task.name,
    sessions: task.timeEntries.map((entry) => ({
      startTime: entry.startTime,
      endTime: entry.endTime
    }))
  }
}
