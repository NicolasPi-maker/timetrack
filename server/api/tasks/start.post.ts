  import { db } from '@nuxthub/db'
  import { isNull } from 'drizzle-orm'
  import { timeEntries } from '../../db/schema'

  export default defineEventHandler(async (event) => {
    const { name } = await readBody<{ name: string }>(event)
    if (!name) throw createError({ statusCode: 400, message: 'name is required' })

    const now = new Date()

    await db.update(timeEntries).set({ endTime: now }).where(isNull(timeEntries.endTime))

    const task = await findOrCreateTask(db, name)
    await db.insert(timeEntries).values({ taskId: task.id, startTime: now, endTime: null })

    const { from, to } = getTodayRange()
    return getTaskInRange(task.id, from, to)
  })
