import { Field, InputType } from '@nestjs/graphql'
import { Role } from '../models/role.enum'

@InputType()
export class AdminCreateUserInput {
  @Field(() => Role)
  role: Role

  @Field()
  email: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string
}
