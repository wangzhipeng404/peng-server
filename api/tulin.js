import request from 'request';
module.exports = {
  '/tulin/chat': async (ctx, next) => {
    const res = await new Promise((resovel, reject) => {
      request({
        url: 'http://openapi.tuling123.com/openapi/api/v2',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: {
          "reqType":0,
          "perception": {
              "inputText": {
                  "text": ctx.query.text.replace(/^@groop\s{1}/, ''),
              },
          },
          "userInfo": {
              "apiKey": "f506a899e543447da4c1a765f4adee8e",
              "userId": "777229674890924032",
          }
        }
      }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            const data = body.results[0]
            resovel({
              type: 'text',
              value: data.values.text
            })
          } else {
            resovel({
              code: 500,
              error: body
            })
          }
      });
    })
    if (res.error) {
      ctx.status = res.code
      ctx.body = res.error
    } else {
      ctx.body = res
    }
  },
}
