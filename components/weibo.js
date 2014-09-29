var jsonp = require('jsonp');
var axios = require('axios');

var Weibo = {
  _getUid: function(token, cb) {
    var uid_url = 'https://api.weibo.com/2/account/get_uid.json?access_token=' + token;
    jsonp(uid_url, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data.uid)
    })
  },

  _getUserByUid: function(token, uid, cb) {
    var user_url = 'https://api.weibo.com/2/users/show.json?access_token=' + token + '&uid=' + uid
    jsonp(user_url, function(err, res) {
      if(err) cb(err)
      cb(null, res.data)
    })
  },

  getUser: function(token, cb) {
    if(!token) throw new Error('Need token.')
    Weibo._getUid(token, function(err, uid) {
      if(err) return cb(err)
      Weibo._getUserByUid(token, uid, function(err, user) {
        if(err) cb(err)
        cb(null, user)
      })
    })
  },

  getTimeline: function(token, cb) {
    if(!token) throw new Error('Need token.')
    var timeline_url = 'https://api.weibo.com/2/statuses/home_timeline.json?access_token=' + token
    jsonp(timeline_url, function(err, res) {
      if(err) cb(err)
      cb(null, res.data.statuses)
    })
  },

  // this will never work until CORS is enabled in the server
  newStatus: function(token, content) {
    if(!token) throw new Error('Need token.')
    var new_status_url = 'https://api.weibo.com/2/statuses/update.json?access_token=' + token + '&status=' + content
    axios.post(new_status_url, {
      withCredentials: true
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });
  }
}

module.exports = Weibo