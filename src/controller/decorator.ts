import { Router, RequestHandler } from 'express';
export const router = Router()

enum Method {
  get = 'get',
  post = 'post'
}

export function controller (target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key)
    const method:Method = Reflect.getMetadata('method', target.prototype, key)
    const middleware = Reflect.getMetadata('middleware', target.prototype, key)
    const hander = target.prototype[key]
    if (path && method && hander) {
      if (middleware) {
        router[method](path, middleware, hander)
      } else {
        router[method](path, hander)
      }
    }
  }
}

// 工厂模式
function getRequestDecorator (type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

// 中间件
export const use = function (fn: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('middleware', fn, target, key)
  }
}

export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')







// export function get(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key)
//     Reflect.defineMetadata('method', 'get', target, key)
//   }
// }

// export function post(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key)
//     Reflect.defineMetadata('method', 'post', target, key)
//   }
// }
