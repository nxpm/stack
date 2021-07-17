import { InputType, Field } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
export class AccountCreateEmailInput {
  @Field()
  @IsEmail()
  email: string
}
