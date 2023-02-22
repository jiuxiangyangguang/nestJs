import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { Logger } from 'src/utils/log4js'

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  cacheSet(key: string, value: string, ttl: number) {
    this.cacheManager.set(key, value, { ttl }, (err) => {
      if (err) throw err
    })
    Logger.info(`Redis 缓存 key:${key} value:${value} `)
  }

  async cacheGet(key: string): Promise<any> {
    return this.cacheManager.get(key)
  }
}
