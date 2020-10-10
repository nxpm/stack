import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user'

@ObjectType()
export class UserToken {
  @Field({ description: 'JWT Bearer token' })
  token: string

  @Field(() => User)
  user: User
}
