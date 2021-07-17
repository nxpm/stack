import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CorePagingInput {
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number
}
