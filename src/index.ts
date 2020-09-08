import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import './controller/LoginController'
import './controller/CrowllerController'
import { router } from './controller/decorator'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cookieSession({
    name: 'session',
    keys: ['fwj key'],
    maxAge: 24 * 60 * 60 * 1000
  })
)
app.use(router)

app.listen(7001, () => {
  console.log('server is runing')
})