const SessionStore = require('../model/sessionStore');

function getCookie(cookies, name) {
   console.log(cookies);
  if (cookies.length > 0) {
    let begin = cookies.indexOf(name + "=");
    if (begin != -1) {
      begin += name.length + 1;
      let end = cookies.indexOf(";", begin);
      if (end == -1)
        end = cookies.length;
      return unescape(cookies.substring(begin, end));
    }
  }
  return null;
}

function getSessionData (conn) {
  const cookies = conn.handshake.query.cookie
  const koaSessionId = getCookie(cookies, 'koa:sess')
  return SessionStore.get(koaSessionId)
}

module.exports = {
  getCookie,
  getSessionData,
}


