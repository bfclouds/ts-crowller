
import { Router, Request, Response, NextFunction } from 'express'
import Crowller from './utils/crowller'
import AirmoleAnalyzer from './utils/airmoleAnalyzer'
import { getResponseData } from './utils/util'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router()

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

// router.get('/getData', checkLogin, (req: Request, res: Response) => {
//   const url = 'http://blog.airmole.cn/'
//   const airmoleAnalyzer = AirmoleAnalyzer.getInstance()
//   const crowller = new Crowller(airmoleAnalyzer, url)
//   crowller.initSpiderProcess()
//   res.send('get data')
// })

// router.get('/showData', checkLogin, (req: Request, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, '../data/content.json')
//     const result = fs.readFileSync(position, 'utf8')
//     res.json(getResponseData(JSON.parse(result)))
//   } catch (e) {
//     res.json(getResponseData(null, '数据不存在'))
//   }
// })

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    res.send('您已登录')
  } else {
    if (password === '123' && req.session) {
      req.session.login = true
      res.send('登录成功')
    } else {
      res.send('登录失败')
    }
  }
})

// router.get('/logout', (req: RequestWithBody, res: Response) => {
//   if (req.session) {
//     req.session.login = false
//   }
//   res.json(getResponseData(true))
// })

export default router