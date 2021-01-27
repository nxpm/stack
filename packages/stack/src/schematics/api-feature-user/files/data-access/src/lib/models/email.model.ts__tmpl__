import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Email {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  public: boolean

  @Field({ nullable: true })
  primary: boolean

  @Field({ nullable: true })
  verified: boolean
}
