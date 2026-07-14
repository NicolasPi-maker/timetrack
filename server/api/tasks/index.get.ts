export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { from: defaultFrom, to: defaultTo } = getTodayRange()

  const from = query.from ? new Date(String(query.from)) : defaultFrom
  const to = query.to ? new Date(String(query.to)) : defaultTo

  return getTasksInRange(from, to)
})
