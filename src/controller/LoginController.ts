import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express'
import { controller, get, post, use } from './decorator';
import { getResponseData } from '../utils/util'

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

@controller
class LoginController {
  @get('/')
  home (req: Request, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send(`
        <html>
          <body>
            <a href='/get_data'>爬取内容</a>
            <a href='/show_data'>展示内容</a>
            <a href='/logout'>退出</a>
          </body>
        </html>
      `)
    } else {
      res.send(`
        <html>
          <body>
            <form method="post" action="/login">
              <input type="password" name="password" />
              <button>登陆</button>
            </form>
          </body>
        </html>
      `)
    }
  }

  @post('/login')
  login(req: BodyRequest, res: Response) {
    const { password } = req.body
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
      res.json(getResponseData(false, '已经登陆过'))
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        res.json(getResponseData(true))
      } else {
        res.json(getResponseData(false, '登陆失败'))
      }
    }
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }
}