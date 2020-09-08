"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var util_1 = require("./utils/util");
var router = express_1.Router();
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请先登录'));
    }
};
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
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send('您已登录');
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.send('登录成功');
        }
        else {
            res.send('登录失败');
        }
    }
});
// router.get('/logout', (req: RequestWithBody, res: Response) => {
//   if (req.session) {
//     req.session.login = false
//   }
//   res.json(getResponseData(true))
// })
exports.default = router;
