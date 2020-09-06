import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import AirmoleAnalyzer from './airmoleAnalyzer'

interface Content {
  title: string,
  content: string
}

interface JsonContent {
  [propName: number]: Content[]
}

interface ContentResult {
  time: number,
  content: Content[]
}

interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  // private url = 'http://blog.airmole.cn/'

  private filePath = path.resolve(__dirname, '../data/content.json')

  constructor (private analyzer:Analyzer, public url: string) {
  }

  async initSpiderProcess () {
    const html = await this.getRawHtml()
    const result = analyzer.analyze(html, this.filePath)
    this.writeFile(JSON.stringify(result))
  }

  // 爬取数据
  async getRawHtml () {
    const html = await superagent.get(this.url)
    return html.text
  }

  // 保存数据
  writeFile (content: string) {
    console.log('打印')
    fs.writeFileSync(this.filePath, content)
  }
}

const url = 'http://blog.airmole.cn/'
const analyzer = new AirmoleAnalyzer()

const croller = new Crowller(analyzer, url)
croller.initSpiderProcess()