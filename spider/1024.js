const rp = require('request-promise');
var iconv = require('iconv-lite');
var Agent = require('socks5-http-client/lib/Agent')
const cheerio = require('cheerio')
var async = require('async')
var qiniu = require('qiniu')

const accessKey = 'tAuYZ504Hk2E5nwec9BO-FNlt8MXggqQnqWcOuPe';
const secretKey = 'InOF_1OJeZgPgq5wyvVs8pXGRg-OI9yermEKhL_P';

var mac = new qiniu
  .auth
  .digest
  .Mac(accessKey, secretKey);
var config = new qiniu
  .conf
  .Config();
config.zone = qiniu.zone.Zone_z2;
var bucketManager = new qiniu
  .rs
  .BucketManager(mac, config);

const host = 'http://t66y.com/'
const listPageUrl = 'thread0806.php?fid=16&search=&page='

function getHTML(url) {
  return rp({
    url: url,
    headers: {
      'Content-Type': 'text/html, utf-8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
          ' Chrome/70.0.3538.77 Safari/537.36'
    },
    encoding: null,
    agentClass: Agent,
    agentOptions: {
      socksHost: '127.0.0.1',
      socksPort: 1080
    }
  }).then(data => {
    return iconv.decode(data, 'gb2312')
  }).catch(e => {
    console.log('出错了')
    console.log(e)
  })
}

function getUrlList(html) {
  return new Promise((resolve, reject) => {
    const urls = [];
    var $ = cheerio.load(html);
    $('tr.tr3 td.tal h3 a').each(function () {
      var color = $(this)
        .find('font')
        .attr('color')
      if (!color || color === 'green') {
        var herf = $(this).attr('href');
        var text = $(this).text();
        urls.push({title: text, link: herf, color: color});
      }
    })
    resolve(urls)
  })
}

function getImgUrl(html) {
  return new Promise((resolve, reject) => {
    const imgs = []
    var $ = cheerio.load(html);
    $('input[type="image"]').each(function () {
      var src = $(this).attr('data-src')
      imgs.push(src)
    })
    resolve(imgs)
  })
}

function saveToQiniu(imgs) {
  console.log(`上传 ${imgs.length} 张至七牛`)
  return new Promise((resolve, reject) => {
    const keys = []
    async.mapLimit(imgs, 10, function (item, callback) {
      bucketManager
        .fetch(item, 'caoliu', '', function (err, respBody, respInfo) {
          if (err) {
            console.log('一张出错了');
            callback(null, true);
          } else {
            if (respInfo.statusCode == 200) {
              keys.push(respBody.key)
            } else {
              console.log(respInfo.statusCode);
            }
            callback(null, true);
          }
        })
    }, function (err, res) {
      if (!err) {
        console.log(`成功上传 ${keys.length} 张`)
        resolve(keys)
      }
    })
  })
}

function QiniuDelete(keys) {
  console.log(`从七牛删除 ${keys.length} 张图片`)
  return new Promise((resolve, reject) => {
    var deleteOperations = keys.map(key => {
      return qiniu.rs.deleteOp('caoliu', key)
    })
    bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
      if (err) {
        resolve(err)
      } else {
        resolve(respBody)
      }
    });
  })
}

async function main(maxPage, maxNum) {
  let urlList = []
  for(let page = 1; page <= maxPage; page++) {
    console.log(`开始爬取第 ${page} 页`)
    const url = host + listPageUrl + page
    const listPageHTML = await getHTML(url)
    const urls = await getUrlList(listPageHTML);
    console.log(`共 ${url.length} 条`)
    urlList = urlList.concat(urls)
  }
  const listLen = urlList.length
  const resultList = []
  for (let i = 0; i < listLen; i++) {
    if (i < maxNum) {
      console.log(`开始爬取第 ${i + 1} 条`)
      const url = urlList[i]
      const detailPageHTML = await getHTML(host + url.link)
      const imgList = await getImgUrl(detailPageHTML)
      const keys = await saveToQiniu(imgList)
      url.raw_imgs = imgList
      url.qiniu_keys = keys
      resultList.push(url)
    } else {
      break
    }
  }
  return new Promise((resolve, reject) => resolve(resultList))
}

module.exports = {
  main: main,
  getUrlList: getUrlList,
  getHTML: getHTML,
  getImgUrl: getImgUrl,
  saveToQiniu: saveToQiniu,
  QiniuDelete: QiniuDelete,
}
// main(1, 1).then(res => console.log(res))
