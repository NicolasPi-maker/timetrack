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
