const rp = require('request-promise');
var iconv = require('iconv-lite');
const cheerio = require('cheerio')

function getHTML(url) {
  console.log(url)
  return rp({
    url: url,
    headers: {
      'Content-Type': 'text/html, utf-8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
        ' Chrome/70.0.3538.77 Safari/537.36'
    },
    // encoding: null,
  }).then(data => {
    return data
    // return iconv.decode(data, 'gb2312')
  }).catch(e => {
    console.log('出错了')
    console.log(e)
  })
}

function getUrlList(html) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('tbody').each(function () {
      var id = $(this).attr('id')
      console.log(id)
      if (/^normalthread_\d+$/g.test(id)) {
        var $a = $(this).find('th').find('.xst');
        const href = $a.attr('href')
        var text = $a.text();
        urls.push({title: text, link: href});
      }
    })
    resolve(urls)
  })
}

function getImgUrl(html) {
  return new Promise((resolve, reject) => {
    const imgs = []
    const data = html.match(/JSON\.parse\((.*)\)/g)
    const detail = eval(data[0])
    resolve(detail)
  })
}

module.exports = {
  getHTML: getHTML,
  getUrlList: getUrlList,
  getImgUrl: getImgUrl,
}
