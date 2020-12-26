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

function qiniuSave(bucket, imgs) {
  return new Promise((resolve, reject) => {
    const errList = []
    async.mapLimit(imgs, 10, function (item, callback) {
      bucketManager
        .fetch(item.link, bucket, item.name , function (err, respBody, respInfo) {
          if (err) {
            errList.push({...item, result: err})
            callback(null, true);
          } else {
            if (respInfo.statusCode == 200) {
            } else {
              console.log(respInfo.statusCode);
              errList.push({...item, result: respBody})
            }
            callback(null, true);
          }
        })
    }, function (err, res) {
      if (!err) {
        resolve(errList)
      }
    })
  }).catch(e => console.log(e))
}

function qiniuDelete(bucket, keys) {
  return new Promise((resolve, reject) => {
    var deleteOperations = keys.map(key => {
      return qiniu.rs.deleteOp(bucket, key)
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

module.exports = {
  qiniuSave,
  qiniuDelete,
}
