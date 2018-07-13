const appConfig = require('../appConfig')
const qiniu = require('qiniu')

const getToken = () => {
  var mac = new qiniu.auth.digest.Mac(appConfig.qiniuAccessKey, appConfig.qiniuSecretKey);
  var options = {
    scope: 'peng',
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  return uploadToken;
}

module.exports = { getToken };
