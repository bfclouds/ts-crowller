"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var airmoleAnalyzer_1 = __importDefault(require("./airmoleAnalyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n    <html>\n      <body>\n        <form method=\"post\" action=\"/login\">\n          <input type=\"\"password\" name=\"password\" />\n          <button>\u767B\u5F55</botton>\n        </from>\n      </body>\n    </html>\n  ");
});
router.get('/getData', function (req, res) {
    var url = 'http://blog.airmole.cn/';
    var airmoleAnalyzer = airmoleAnalyzer_1.default.getInstance();
    var crowller = new crowller_1.default(airmoleAnalyzer, url);
    crowller.initSpiderProcess();
    res.send('get data');
});
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
exports.default = router;
