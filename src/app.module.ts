import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ConfigModules } from './config/config.module'
import { RedisCacheModule } from './db/redis-cache/redis-cache.module'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      // 配置写在这里
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mytest',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    ConfigModules,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
