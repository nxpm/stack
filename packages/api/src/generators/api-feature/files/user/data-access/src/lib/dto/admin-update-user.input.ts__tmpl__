import { Field, InputType } from '@nestjs/graphql'
import { Role } from '../models/role.enum'

@InputType()
export class AdminUpdateUserInput {
  @Field(() => Role, { nullable: true })
  role: Role

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  phone: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  location?: string

  @Field({ nullable: true })
  bio?: string
}
