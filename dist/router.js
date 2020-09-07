"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var express_1 = require("express");
var crowller_1 = __importDefault(require("./utils/crowller"));
var airmoleAnalyzer_1 = __importDefault(require("./utils/airmoleAnalyzer"));
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
router.get('/getData', checkLogin, function (req, res) {
    var url = 'http://blog.airmole.cn/';
    var airmoleAnalyzer = airmoleAnalyzer_1.default.getInstance();
    var crowller = new crowller_1.default(airmoleAnalyzer, url);
    crowller.initSpiderProcess();
    res.send('get data');
});
router.get('/showData', checkLogin, function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/content.json');
        var result = fs_1.default.readFileSync(position, 'utf8');
        res.json(util_1.getResponseData(JSON.parse(result)));
    }
    catch (e) {
        res.json(util_1.getResponseData(null, '数据不存在'));
    }
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
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = false;
    }
    res.json(util_1.getResponseData(true));
});
exports.default = router;
