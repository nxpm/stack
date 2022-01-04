import { logDate, timeDiff } from '@nxpm/common'

export function logEntry(message: string, startDate?: Date) {
  console.log(`[${logDate()}] ${message}`, startDate ? ` -> Duration ${timeDiff(startDate)} seconds` : '')
}
