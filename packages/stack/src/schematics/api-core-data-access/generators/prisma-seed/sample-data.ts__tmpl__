import { Prisma, Role } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { createUser } from './lib/helpers'

const PASSWORD = hashSync('nxpm-dot-dev!', 10)

export const users: Prisma.UserCreateInput[] = [
  createUser('admin', 'admin', 'admin@nxpm.dev', PASSWORD, Role.Admin),
  createUser('user', 'user', 'user@nxpm.dev', PASSWORD, Role.User),
]
