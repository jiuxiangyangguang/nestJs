import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/entities/user.entity'
import { UserService } from '../user/user.service'
import * as _ from 'lodash'
import { RedisCacheService } from 'src/db/redis-cache/redis-cache.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisCacheService: RedisCacheService,
  ) {}

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user)
  }

  async login(user: Partial<User>) {
    const users = await this.userService.findOne(user.username)
    const token = this.createToken(_.omit(users, ['password', 'id']))

    // redis 缓存token 设置过期时间3600秒
    await this.redisCacheService.cacheSet(`${users.username}`, token, 3600) // 过期时间秒
    return { token, user: _.omit(users, ['password']) }
  }

  async getUser(user) {
    const username = user.username
    return await this.userService.findOne(username)
  }
}
