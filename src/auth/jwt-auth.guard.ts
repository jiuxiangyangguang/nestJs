import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (info && info.name === 'TokenExpiredError') {
      // jwt设置的过期时间到了就提示  redis里面也可以设置过期时间
      throw new UnauthorizedException('签名已过期')
    }
    if (err || !user) {
      throw err || new UnauthorizedException(info.message)
    }
    return user
  }
}
