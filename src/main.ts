import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册拦截错误请求
  app.useGlobalInterceptors(new TransformInterceptor()); // 注册拦截成功请求
  await app.listen(3000);
}
bootstrap();
