const rp = require('request-promise');
var iconv = require('iconv-lite');
const cheerio = require('cheerio')

function getHTML(url) {
  console.log(url)
  return rp({
    url: url,
    headers: {
      'Referer': 'http://wuxianhome.com/forum.php',
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
    var $ = cheerio.load(html);
    const $post = $('#postlist').find('div[id^=post]').first()
    $post.find('ignore_js_op').find('img').each(function () {
      var src = $(this).attr('zoomfile')
      if (src) {
        imgs.push(src)
      }
    })
    resolve(imgs)
  })
}
const headers = {
  'Host': 'wuxianxian.com',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
  'Cookie': '',
}
function getMagazineHTML(url) {
  console.log(url)
  return rp({
    url: url,
    resolveWithFullResponse: true,
    headers: {
      ...headers,
      'Referer': url,
    },
    // encoding: null,
  })
  .then(res => {
    return res.body
  })
  .then(data => {
    if(/javascript:jump/g.test(data)) {
      console.log(data)
      const uid = data.match(/'uid_value'\s?:\s?"\w+cookie"/g)[0].replace(/'uid_value'\s?:\s?/g, '').replace(/"/g, '')
      const upi = data.match(/'upi_value'\s?:\s?".+"/g)[0].replace(/'upi_value'\s?:\s?/g, '').replace(/"/g, '')
      console.log(uid, upi)
      headers.Cookie = `__cm_warden_uid = ${uid}; __cm_warden_upi = ${upi}`
      return getMagazineHTML(url)
    } else {
      return data
    }
    // return iconv.decode(data, 'gb2312')
  }).catch(e => {
    console.log('出错了')
    console.log(e)
  })
}

function getMagazineList(html) {
  return new Promise((resolve, reject) => {
    const articles = [];
    var $ = cheerio.load(html);
    $('.post-list-item').each(function () {
      const $this = $(this)
      const $a = $this.find('h2').find('a')
      const link = $a.attr('href')
      const title = $a.text()
      let pic = $this.find('.post-thumb').data('src')
      const tags = []
      $this.find('.list-category').each(function () {
        const href = $(this).attr('href')
        tags.push({
          text: $(this).text(),
          key: href.replace('http://wuxianxian.com/tag/', ''),
        })
      })
      articles.push({
        title: title,
        link: link,
        pic: pic,
        label: $this.find('.post-list-cat').find('.post-list-cat-item').text().trim(),
        tags: tags,
        note: $this.find('.post-excerpt').text(),
        time: $this.find('.b2timeago').attr('datetime').slice(0, 19),
      })
    })
    const nextPage = $('.pagination').find('.next-page').text()

    resolve({
      list: articles,
      more: nextPage === '下一页',
    })
  }).catch(e => {
    console.log(e)
  })
}

function getMagazineContent(url) {
  return new Promise((resolve, reject) => {
    getMagazineHTML(url).then(html => {
      var $ = cheerio.load(html);
      const pagination = []
      const content = []
      const $content = $('.entry-content')
      $content.find('p').each(function () {
        const $this = $(this)
        const $img = $this.find('img')
        if($img.attr('src')) {
          content.push({
            type: 'img',
            value: $img.attr('src')
          })
        } else {
          content.push({
            type: 'text',
            value: $this.text()
          })
        }
      })

      $content.find('.article-paging').find('a').each(function () {
        pagination.push($(this).attr('href'))
      })
      resolve({
        content: content,
        pagination: pagination,
      })
    })
  }).catch(e => {
    console.log(e)
  })
}

function getMagazineDetailImages(html) {
  return new Promise((resolve, reject) => {
      var $ = cheerio.load(html);
      const images = []
      $('img').each(function () {
        images.push($(this).attr('src'))
      })
      resolve(images)
  }).catch(e => {
    console.log(e)
  })
}

module.exports = {
  getHTML: getHTML,
  getUrlList: getUrlList,
  getImgUrl: getImgUrl,
  getMagazineList: getMagazineList,
  getMagazineHTML: getMagazineHTML,
  getMagazineContent: getMagazineContent,
  getMagazineDetailImages: getMagazineDetailImages,
}
