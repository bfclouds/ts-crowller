import 'reflect-metadata';
import { Request, Response } from 'express'
import { controller, get } from './decorator';

@controller
class LoginController {
  login () {}

  @get('/')
  home (req: Request, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send(`
        <html>
          <body>
            <a href='/getData'>爬取内容</a>
            <a href='/showData'>展示内容</a>
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
}