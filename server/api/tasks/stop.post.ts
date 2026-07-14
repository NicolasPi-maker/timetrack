import { and, eq, isNull, sql } from 'drizzle-orm'
import { tasks, timeEntries } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const { name } = await readBody<{ name: string }>(event)
  if (!name) throw createError({ statusCode: 400, message: 'name is required' })

  const task = await db.query.tasks.findFirst({
    where: sql`lower(${tasks.name}) = lower(${name})`
  })
  if (!task) throw createError({ statusCode: 404, message: 'Task not found' })

  await db
    .update(timeEntries)
    .set({ endTime: new Date() })
    .where(and(eq(timeEntries.taskId, task.id), isNull(timeEntries.endTime)))

  const { from, to } = getTodayRange()
  return getTaskInRange(task.id, from, to)
})
