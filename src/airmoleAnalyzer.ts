
import cheerio from 'cheerio'
import fs from 'fs'

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

class AirmoleAnalyzer {
  // 处理数据
  getJsonInfo (html: string) {
    const $ = cheerio.load(html)
    const items = $('div.post-preview')
    const arr: Content[] = [];
    items.map((index, element) => {
      const title = $(element).find('.post-title').text()
      let content = $(element).find('.post-content-preview').text().trim()
      content.replace(/\s+/g, '')
      arr.push({
        title,
        content
      })
    })
    return {
      time: new Date().getTime(),
      content: arr
    }
  }

  //  处理json文件
  generateJsonContent (content: ContentResult, filePath: string) {
    let fileContent:JsonContent = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      fileContent[content.time] = content.content
    } else {
      fileContent[content.time] = content.content
    }
    return fileContent
  }

  public analyze (html: string, filePath: string) {
    const jsonInfo = this.getJsonInfo(html)
    const fileContent = this.generateJsonContent(jsonInfo, filePath)
    return JSON.stringify(fileContent)
  }
}

export default AirmoleAnalyzer