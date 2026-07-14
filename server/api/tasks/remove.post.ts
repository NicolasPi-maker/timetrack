import { eq, sql } from 'drizzle-orm'
import { tasks, timeEntries } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const { name } = await readBody<{ name: string }>(event)
  if (!name) throw createError({ statusCode: 400, message: 'name is required' })

  const task = await db.query.tasks.findFirst({
    where: sql`lower(${tasks.name}) = lower(${name})`
  })
  if (!task) throw createError({ statusCode: 404, message: 'Task not found' })

  await db.delete(timeEntries).where(eq(timeEntries.taskId, task.id))
  await db.delete(tasks).where(eq(tasks.id, task.id))

  return { id: String(task.id) }
})
