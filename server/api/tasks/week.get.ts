export default defineEventHandler(async () => {
  const { from, to } = getWeekRange()
  return getTasksByDayInRange(from, to)
})
