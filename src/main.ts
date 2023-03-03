import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './core/filter/http-exception.filter'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { logger } from './middleware/logger.middleware'
import * as express from 'express'
import { AllExceptionsFilter } from './core/filter/any-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.setGlobalPrefix('api') // 全局路由前缀
  app.use(express.json()) // For parsing application/json
  app.use(express.urlencoded({ extended: true })) // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger)
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('nestJS测试')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.useGlobalInterceptors(new TransformInterceptor()) // 注册拦截成功请求
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionFilter()) // 注册拦截错误请求
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  ) // 注册管道运算符

  await app.listen(3000)
}
bootstrap()
