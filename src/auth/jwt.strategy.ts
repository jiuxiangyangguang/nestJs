import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthService } from './auth.service'
import { User } from 'src/user/entities/user.entity'
import * as _ from 'lodash'
import { RedisCacheService } from 'src/db/redis-cache/redis-cache.service'
import { UnauthorizedException } from '@nestjs/common'

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly redisCacheService: RedisCacheService,
  ) {
    super({
      // 如何提取令牌
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 是否忽略令牌过期
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('SECRET'),
    } as StrategyOptions)
  }

  async validate(req, user: User) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    const cacheToken = await this.redisCacheService.cacheGet(user.username)
    console.log(cacheToken)
    if (!cacheToken) {
      // 缓存里面取token,取不到可能已过期
      throw new UnauthorizedException('token 已过期')
    }

    // 当其他地方登录时会重新生成token存储在redis中 用户传的token不正确就会挤下线
    if (token != cacheToken) {
      throw new UnauthorizedException('您的账号在其他地方登录，请重新登录')
    }

    return user
  }
}
