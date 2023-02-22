import * as moment from 'moment'

export const Func = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value
    descriptor.value = function (...rest) {
      const result = fn.apply(this, rest)
      result.createTime = moment(result.createTime).format(
        'yyyy-MM-DD HH:mm:ss',
      )
      result.updateTime = moment(result.updateTime).format(
        'yyyy-MM-DD HH:mm:ss',
      )
      return result
    }
  }
}
