import { Router } from 'express';
export const router = Router()

export function controller (target: any) {
  for (let key in target.prototype) {
    console.log(Reflect.getMetadata('path', target.prototype, key))
    const path = Reflect.getMetadata('path', target.prototype, key)
    const hander = target.prototype[key]
    if (path) {
      router.get(path, hander)
    }
  }
}

export function get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key)
  }
}
