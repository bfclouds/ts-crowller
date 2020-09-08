"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.use = exports.controller = exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        var path = Reflect.getMetadata('path', target.prototype, key);
        var method = Reflect.getMetadata('method', target.prototype, key);
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        var hander = target.prototype[key];
        if (path && method && hander) {
            if (middleware) {
                exports.router[method](path, middleware, hander);
            }
            else {
                exports.router[method](path, hander);
            }
        }
    }
}
exports.controller = controller;
// 工厂模式
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
// 中间件
exports.use = function (fn) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', fn, target, key);
    };
};
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
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
