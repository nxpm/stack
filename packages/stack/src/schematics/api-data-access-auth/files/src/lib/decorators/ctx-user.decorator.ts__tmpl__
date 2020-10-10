import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CtxUser = createParamDecorator((data, ctx) => GqlExecutionContext.create(ctx).getContext().req.user)
