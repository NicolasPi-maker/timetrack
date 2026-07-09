import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const timeEntries = sqliteTable('time_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  description: text('description').notNull(),
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull(),
  endedAt: integer('ended_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})
