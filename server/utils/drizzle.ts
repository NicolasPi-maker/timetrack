import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export { schema }

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type TimeEntry = typeof schema.timeEntries.$inferSelect
export type NewTimeEntry = typeof schema.timeEntries.$inferInsert
