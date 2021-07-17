import { Field, ObjectType } from '@nestjs/graphql'
import { Email } from './email.model'
import { Role } from './role.enum'

@ObjectType()
export class User {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  phone: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  location?: string

  @Field({ nullable: true })
  bio?: string

  @Field(() => Role, { nullable: true })
  role: Role

  @Field(() => [Email], { nullable: true })
  emails: Email[]

  password?: string
}
