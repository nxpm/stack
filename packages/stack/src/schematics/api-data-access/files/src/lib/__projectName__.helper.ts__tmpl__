import { compareSync, hashSync } from 'bcryptjs'
import { createHash } from 'crypto'

const getHash = (str) => createHash('md5').update(str).digest('hex')

const gravatarUrl = 'https://www.gravatar.com/avatar/'
const gravatarSize = 460

export const getGravatarUrl = (email = '') => `${gravatarUrl}${getHash(email)}?s=${gravatarSize}&d=mp`

export function validatePassword(password: string, hashedPassword: string): boolean {
  return compareSync(password, hashedPassword)
}

export function hashPassword(password: string): string {
  return hashSync(password, 10)
}
