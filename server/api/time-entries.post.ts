import { schema, useDrizzle } from "../utils/drizzle"

export default defineEventHandler(async (event) => {
  const body = await readBody<{ description: string }>(event)

  if (!body.description) {
    throw createError({ statusCode: 400, statusMessage: 'description is required' })
  }

  const db = useDrizzle()
  const [entry] = await db
    .insert(schema.timeEntries)
    .values({ description: body.description, startedAt: new Date() })
    .returning()

  return entry
})
