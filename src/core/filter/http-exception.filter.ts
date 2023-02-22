import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { isObject } from 'lodash'
import { Logger } from 'src/utils/log4js'
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp() // 获取请求上下文
    const response = ctx.getResponse() // 获取请求上下文中的 response对象
    const status = exception.getStatus() // 获取异常状态码
    const request = ctx.getRequest()
    // const message = exception.message

    // 设置错误信息
    const res = exception.getResponse()
    const message = isObject(res)
      ? res
      : {
          statusCode: exception.getStatus(),
          message: res,
        }

    const logFormat = ` 
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${exception.toString()} \n  
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
    Logger.info(logFormat)

    response.status(status).json(message)
  }
}
