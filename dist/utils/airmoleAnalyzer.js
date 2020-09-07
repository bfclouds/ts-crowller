"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var AirmoleAnalyzer = /** @class */ (function () {
    function AirmoleAnalyzer() {
    }
    // 单例模式
    AirmoleAnalyzer.getInstance = function () {
        if (!AirmoleAnalyzer.instance) {
            AirmoleAnalyzer.instance = new AirmoleAnalyzer();
        }
        return AirmoleAnalyzer.instance;
    };
    // 处理数据
    AirmoleAnalyzer.prototype.getJsonInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var items = $('div.post-preview');
        var arr = [];
        items.map(function (index, element) {
            var title = $(element).find('.post-title').text();
            var content = $(element).find('.post-content-preview').text().trim();
            content.replace(/\s+/g, '');
            arr.push({
                title: title,
                content: content
            });
        });
        return {
            time: new Date().getTime(),
            content: arr
        };
    };
    //  处理json文件
    AirmoleAnalyzer.prototype.generateJsonContent = function (content, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
            fileContent[content.time] = content.content;
        }
        else {
            fileContent[content.time] = content.content;
        }
        return fileContent;
    };
    AirmoleAnalyzer.prototype.analyze = function (html, filePath) {
        var jsonInfo = this.getJsonInfo(html);
        var fileContent = this.generateJsonContent(jsonInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return AirmoleAnalyzer;
}());
exports.default = AirmoleAnalyzer;
