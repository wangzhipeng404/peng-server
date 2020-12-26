const rp = require('request-promise');
var iconv = require('iconv-lite');
const cheerio = require('cheerio');
const headers = {
  'Content-Type': 'text/html, utf-8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
    ' Chrome/70.0.3538.77 Safari/537.36'
}

function proxyRequest (url) {
  return rp({
    url: url,
    headers: headers,
    encoding: null,
  }).then(data => {
    return data
    // return iconv.decode(data, 'gb2312')
  }).catch(e => {
    console.log('出错了')
    // console.log(e)
  })
}


function getHTML(url) {
  console.log(url)
  return rp({
    url: url,
    headers: headers,
    // encoding: null,
  }).then(data => {
    return data
    // return iconv.decode(data, 'gb2312')
  }).catch(e => {
    console.log('出错了')
    console.log(e)
  })
}

function getNavData(html, url) {
  return new Promise((resolve, reject) => {
    const area = [];
    const tags = [];
    var $ = cheerio.load(html);
    $('.menu').children('li').not('#tag').each(function() {
      const $a = $(this).find('a')
      area.push({
        name: $a.text(),
        link: $a.attr('href'),
      })
    })
    $('.menu').find('#tag_ul').find('li').each(function() {
      const $a = $(this).find('a')
      tags.push({
        name: $a.text(),
        link: $a.attr('href'),
      })
    })
    resolve({
      area: area,
      tags: tags,
    })
  }).catch(e => console.log(e))
}

function getMagazineList(html, url) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('.hezi').find('li').each(function() {
      const $li = $(this)
      const data = {
        tags: [],
      }
      $li.children().each(function(index) {
        const $el = $(this)
        switch(index) {
          case 0:
            data.link = $el.attr('href')
            data.pic = $el.find('img').attr('src')
            break;
          case 1:
            data.pic_num = $el.text()
            break;
          case 2:
            data.agency = {
              name: $el.find('a').text(),
              link: $el.find('a').attr('href'),
            }
            break;
          case 3:
            data.model = {
              name: $el.find('a').text(),
              link: $el.find('a').attr('href'),
            }
            break;
          case 4:
            $el.find('a').each(function() {
              data.tags.push({
                name: $(this).text(),
                link: $(this).attr('href')
              })
            })
            break;
          case 5:
            data.title = $el.find('a').text()
            break;
          default:
            break;
        }
      })
      urls.push(data)
    })
    resolve({
      more: $('#pages').find('.a1').last().attr('href') !== url,
      list: urls
    })
  })
}

function getAgencyMagazineList(html) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('.hezi').find('li').each(function() {
      const $li = $(this)
      const data = {
        tags: [],
      }
      $li.children().each(function(index) {
        const $el = $(this)
        switch(index) {
          case 0:
            data.link = $el.attr('href')
            data.pic = $el.find('img').attr('src')
            break;
          case 1:
            data.pic_num = $el.text()
            break;
          case 2:
            data.model = {
              name: $el.text().replace('模特：\n', ''),
              link: $el.find('a').attr('href'),
            }
            break;
          case 3:
            $el.find('a').each(function() {
              data.tags.push({
                name: $(this).text(),
                link: $(this).attr('href')
              })
            })
            break;
          case 4:
            data.title = $el.find('a').text()
            break;
          default:
            break;
        }
      })
      urls.push(data)
    })
    resolve({
      more: $(this).find('pages').find('.next').text() === '下一页',
      list: urls
    })
  })
}

function getModelMagazineList(html) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('.hezi').find('li').each(function() {
      const $li = $(this)
      const data = {
        tags: [],
      }
      $li.children().each(function(index) {
        const $el = $(this)
        switch(index) {
          case 0:
            data.link = $el.attr('href')
            data.pic = $el.find('img').attr('src')
            break;
          case 1:
            data.pic_num = $el.text()
            break;
          case 2:
            data.agency = {
              name: $el.find('a').text(),
              link: $el.find('a').attr('href'),
            }
            break;
          case 3:
            $el.find('a').each(function() {
              data.tags.push({
                name: $(this).text(),
                link: $(this).attr('href')
              })
            })
            break;
          case 4:
            data.title = $el.find('a').text()
            break;
          default:
            break;
        }
      })
      urls.push(data)
    })
    const $renwu = $('.renwu')
    const $right = $renwu.find('.right')
    let str = ''
    $right.find('p').each(function() {
      str += $(this).text()
    })
    const tags = []
    $renwu.find('.shuoming').find('a').each(function() {
      tags.push({
        name: $(this).text(),
        link: $(this).attr('href')
      })
    })
    const model = {
      pic: $renwu.find('.left').find('img').attr('src'),
      name: $right.find('h1').text(),
      base: str,
      tags: tags,
      total: $('.shoulushuliang').find('span').text()
    }

    resolve({
      more: $(this).find('pages').find('.next').text() === '下一页',
      list: urls,
      model: model,
    })
  }).catch(e => console.log(e))
}

function getModelDetail(url, id) {
  console.log(id)
  return new Promise((resolve, reject) => {
    rp({
      url: url,
      headers: headers,
      resolveWithFullResponse: true,
      timeout: 30000,
    })
    .then(res => {
      if(parseInt(res.statusCode / 100) === 2) {
        const html = res.body
        var $ = cheerio.load(html, {decodeEntities: false});
        const $renwu = $('.renwu')
        const $right = $renwu.find('.right')
        const plain = []
        $right.find('p').each(function() {
          const innerHtml =  $(this).html()
          if(innerHtml) {
            const textList =innerHtml.replace(/\s+/g, '').replace(/<span>|\<\/span>/g, ' ').trim().split(' ')
            const len = textList.length
            for(let i = 0; i < len; i += 2) {
              plain.push({
                label: textList[i],
                value: textList[i + 1]
              })
            }
          }
        })
        const magazines = []
        $('.hezi').find('li').each(function() {
          const link = $(this).children('a').attr('href')
          magazines.push(link.match(/\d+/g)[0])
        })
        const data = {
          i: id,
          pic: $renwu.find('.left').find('img').attr('src'),
          name: $right.find('h1').text(),
          intro: $renwu.find('.shuoming').text(),
          plain,
          magazines,
        }
        resolve(data)
      } else {
        console.error(`err ${id}`)
        resolve({
          err: res.statusCode
        })
      }
    }).catch(e => {
      console.error(`err ${id}`)
      resolve({
        err: e.statusCode
      })
    })
  })
  .catch(e => {
    console.error(`err ${id}`)
    resolve({
      err: e.statusCode
    })
  })
}

function getModelList(html) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('.hezi_t').find('li').each(function(index) {
      let data = {}
      const $li = $(this)
      data.link = $li.children('a').attr('href')
      data.pic = $li.children('a').find('img').attr('src')
      data.pic_num = $li.find('.shuliang').text().replace('套', '')
      data.name = $li.find('p').find('a').text()
      urls.push(data)
    })
    resolve({
      more: $(this).find('pages').find('.next').text() === '下一页',
      list: urls
    })
  })
}

function getAgencyList(html) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('.jigou').find('li').each(function(index) {
      let data = {}
      const $li = $(this)
      data.link = $li.children('a').attr('href')
      data.pic_num = $li.find('span').text().replace(' 套', '')
      data.name = $li.children('a').text()
      urls.push(data)
    })
    const $fenlei = $('.fenlei')
    resolve({
      list: urls,
      agency: {
        name: $fenlei.find('h1').text(),
        plain: $fenlei.find('p').text(),
      },
      more: $(this).find('pages').find('.next').text() === '下一页',
    })
  }).catch(e => console.log(e))
}

function getSearchList(html) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('.hezi').find('li').each(function(index) {
      const $li = $(this)
      urls.push($li.children('a').attr('href'))
    })
    const all = urls.map(url => {
      return getHTML(url).then(h => {
        return getMagazineDetail(h)
      })
    })
    resolve(Promise.all(all))
  }).catch(e => {
    console.log(e)
    throw new Error(e)
  })
}


function getMagazineDetail(html) {
  return new Promise((resolve, reject) => {
    var $ = cheerio.load(html);
    const detail = {
      plain: [],
    }
    const $tuji = $('.tuji')
    detail.title = $tuji.find('h1').text()
    detail.pic_host = $('.content').find('img').first().attr('src').replace(/\/\d+.jpg/g, '')
    detail.i = parseInt(detail.pic_host.replace('https://lns.hywly.com/a/1/', ''))
    $tuji.children('p').each(function(index) {
      const text = $(this).text()
      if(text.match('图片数量')) {
        detail.pic_num = text.match(/\d+/g)[0]
      } else {
        const t = text.replace(/\n/g, '').replace(/\s+/g, ' ')
        const indexof = t.indexOf('生日')
        if(indexof !== -1) {
          detail.plain.push(t.substring(0, indexof))
          detail.plain.push(t.substring(indexof, t.length))
        } else {
          detail.plain.push(t)
        }
      }
    })
    resolve(detail)
  }).catch(e => console.log(e))
}

function getFullDetail(url, id) {
  return new Promise((resolve, reject) => {
    rp({
      url: url,
      headers: headers,
      resolveWithFullResponse: true,
      timeout: 20000,
    })
    .then(res => {
      if(parseInt(res.statusCode / 100) === 2) {
        const html = res.body
        getMagazineDetail(html).then(data => {
          resolve(data)
        })
      } else {
        console.error(`err ${id} ${res.statusCode}`)
        resolve({
          err: res.statusCode
        })
      }
    }).catch(e => {
      console.error(`err ${id}`)
      resolve({
        err: 'err'
      })
    })
  })
  .catch(e => {
    console.error(`err ${id}`)
    resolve({
      err: e.statusCode
    })
  })
}

module.exports = {
  getHTML,
  getMagazineList,
  getModelList,
  getAgencyList,
  getAgencyMagazineList,
  getModelMagazineList,
  getMagazineDetail,
  proxyRequest,
  getNavData,
  getSearchList,
  getModelDetail,
  getFullDetail,
}
