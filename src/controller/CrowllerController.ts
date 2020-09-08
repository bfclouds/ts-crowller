import path from 'path'
import fs from 'fs'
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express'
import Crowller from '../utils/crowller'
import AirmoleAnalyzer from '../utils/airmoleAnalyzer'
import { controller, get, post, use } from './decorator';
import { getResponseData } from '../utils/util'

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

@controller
class CrowllerController {
  @get('/get_data')
  @use(checkLogin)
  getData(req: Request, res: Response) {
    const url = 'http://blog.airmole.cn/'
    const airmoleAnalyzer = AirmoleAnalyzer.getInstance()
    const crowller = new Crowller(airmoleAnalyzer, url)
    try {
      const resD = crowller.initSpiderProcess()
      res.json(getResponseData(resD))
    } catch {
      res.json(getResponseData(null, '爬取失败！'))
    }
  }

  @get('/show_data')
  @use(checkLogin)
  showData (req: Request, res: Response) {
    try {
      const position = path.resolve(__dirname, '../../data/content.json')
      const result = fs.readFileSync(position, 'utf8')
      res.json(getResponseData(JSON.parse(result)))
    } catch (e) {
      res.json(getResponseData(null, '数据不存在'))
    }
  }
}