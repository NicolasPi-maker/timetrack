import { relations } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export const timeEntries = sqliteTable('time_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  taskId: integer('task_id').notNull().references(() => tasks.id),
  startTime: integer('start_time', { mode: 'timestamp' }).notNull(),
  endTime: integer('end_time', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export const tasksRelations = relations(tasks, ({ many }) => ({
  timeEntries: many(timeEntries)
}))

export const timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  task: one(tasks, { fields: [timeEntries.taskId], references: [tasks.id] })
}))
