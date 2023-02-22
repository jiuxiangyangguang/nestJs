import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { intersection } from 'lodash'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string>('roles', context.getHandler())
    if (!roles) {
      return true // 所有角色都可以访问
    }
    const request = context.switchToHttp().getRequest() // 根据用户请求提取用户信息  限制用户访问
    const user = request.user
    return this.matchRoles(roles, [user.role])
  }

  private matchRoles(roles, userRoles): boolean {
    return !!intersection(roles, userRoles).length
  }
}
