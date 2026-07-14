import type * as schema from '../db/schema'

export type TimeEntry = typeof schema.timeEntries.$inferSelect
export type NewTimeEntry = typeof schema.timeEntries.$inferInsert

export type TaskRow = typeof schema.tasks.$inferSelect
export type NewTaskRow = typeof schema.tasks.$inferInsert
