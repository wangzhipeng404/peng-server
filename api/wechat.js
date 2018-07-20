import request from 'request';
import appConfig from '../appConfig';

const getOpenId = code => {
  return new Promise((resolve, reject) => {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appConfig.AppID}&secret=${appConfig.AppSecret}&js_code=${code}&grant_type=authorization_code`
    request(url,function (error, response, data) {
      resolve(JSON.parse(data))
    });
  })
}

module.exports = {
  getOpenId,
}
