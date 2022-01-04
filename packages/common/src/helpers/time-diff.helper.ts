export function timeDiff(start: Date, end = new Date()) {
  const diff = (start.getTime() - end.getTime()) / 1000

  return Math.abs(Math.round(diff))
}
