import { Prisma, Role } from '@prisma/client'

export function createUser(
  id: string,
  username: string,
  email: string,
  password: string,
  role: Role,
): Prisma.UserCreateInput {
  return {
    id,
    username,
    email,
    role,
    password,
    avatarUrl: 'https://www.gravatar.com/avatar?d=mp',
  }
}
