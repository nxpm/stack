import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CorePaging {
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  skip?: number

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  total?: number
}
