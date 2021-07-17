import { Field, InputType } from '@nestjs/graphql'
import { MinLength } from 'class-validator'

@InputType()
export class AccountUpdatePasswordInput {
  @Field()
  currentPassword?: string

  @Field()
  @MinLength(10)
  password?: string

  @Field()
  @MinLength(10)
  verified?: string
}
