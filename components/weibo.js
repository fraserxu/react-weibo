var jsonp = require('jsonp');
var axios = require('axios');

var API_BASE = 'https://api.weibo.com/2'

var Weibo = {
  _getUid: function(token, cb) {
    var uid_url = API_BASE + '/account/get_uid.json?access_token=' + token;
    jsonp(uid_url, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data.uid)
    })
  },

  _getUserByUid: function(token, uid, cb) {
    var user_url = API_BASE + '/users/show.json?access_token=' + token + '&uid=' + uid
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
    var timeline_url = API_BASE + '/statuses/home_timeline.json?access_token=' + token
    jsonp(timeline_url, function(err, res) {
      if(err) cb(err)
      cb(null, res.data.statuses)
    })
  },

  // http://open.weibo.com/wiki/2/comments/show
  loadComments: function(token, id, cb) {
    if(!token) throw new Error('Need token.')
    var comments_url = API_BASE + '/comments/show.json?access_token=' + token + '&id=' + id
    jsonp(comments_url, function(err, res) {
      if(err) cb(err)
      cb(null, res.data.comments)
    })
  },

  // http://open.weibo.com/wiki/2/statuses/update
  newStatus: function(token, status, cb) {
    if(!token) throw new Error('Need token.')
    axios.post('statuses/update', {
      access_token: token,
      status: status
    }).then(function(response) {
      cb(null, response)
    })
    .catch(function(err) {
      cb(err)
    })
  },

  // http://open.weibo.com/wiki/2/statuses/destroy
  destroyStatus: function(token, id, cb) {
    if(!token) throw new Error('Need token.')
    axios.post('statuses/destroy', {
      access_token: token,
      id: id
    }).then(function(response) {
      cb(null, response)
    })
    .catch(function(err) {
      cb(err)
    })
  },

  // http://open.weibo.com/wiki/2/comments/create
  replyPost: function(token, id, comment, comment_ori, cb) {
    if(!token) throw new Error('Need token.')
    axios.post('comments/create', {
      access_token: token,
      id: id,
      comment: comment,
      comment_ori: comment_ori || 0
    }).then(function(response) {
      cb(null, response)
    })
    .catch(function(err) {
      cb(err)
    })
  },

  // http://open.weibo.com/wiki/2/comments/reply
  replyComment: function(token, cid, pid, comment, without_mention, comment_ori, cb) {
    if(!token) throw new Error('Need token.')
    axios.post('comments/create', {
      access_token: token,
      cid: cid,
      id: pid,
      comment: comment,
      without_mention: without_mention || 1,
      comment_ori: comment_ori || 1
    }).then(function(response) {
      cb(null, response)
    })
    .catch(function(err) {
      cb(err)
    })
  }
}

module.exports = Weibo