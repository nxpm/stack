import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthAdminGuard extends AuthGuard('jwt') {
  private readonly _roles: string[] = ['Admin']

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)

    return ctx.getContext().req
  }

  constructor() {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    if (!req || !req.user) {
      return false
    }
    const hasAccess = this.hasAccess(req.user)

    if (!hasAccess) {
      throw new ForbiddenException(`You need to have Admin access`)
    }
    return req && req.user && this.hasAccess(req.user)
  }

  private hasAccess(user): boolean {
    return user.role && this._roles.includes(user.role)
  }
}
