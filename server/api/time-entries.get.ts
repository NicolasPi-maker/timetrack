import { schema, useDrizzle } from "../utils/drizzle"

export default defineEventHandler(async () => {
  const db = useDrizzle()
  return db.select().from(schema.timeEntries).all()
})
