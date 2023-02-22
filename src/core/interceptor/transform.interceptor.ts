import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import * as moment from 'moment'
import { map, Observable } from 'rxjs'
import { Logger } from 'src/utils/log4js'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req
    return next.handle().pipe(
      map((data) => {
        // 对时间统一处理
        const { createTime, updateTime } = data
        if (createTime) {
          data.createTime = moment(createTime).format('yyyy-MM-DD HH:mm:ss')
        }
        if (updateTime) {
          data.updateTime = moment(updateTime).format('yyyy-MM-DD HH:mm:ss')
        }
        const logFormat = ` 
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            Request original url: ${req.originalUrl}
            Method: ${req.method}
            IP: ${req.ip}
            User: ${JSON.stringify(req.user)}
            Response data:\n ${JSON.stringify(data)}
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
        Logger.info(logFormat)
        Logger.access(logFormat)

        return {
          data,
          code: 0,
          msg: '请求成功',
        }
      }),
    )
  }
}
