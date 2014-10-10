'use strict';

var {
  request,
  jsonpRequest
} = require('./APIUtils');

var WeiboAPI = {
  _getUid: function(token, cb) {
    jsonpRequest('/account/get_uid.json', {
      access_token: token
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data.uid)
    })
  },

  _getUserByUid: function(token, uid, cb) {
    jsonpRequest('/users/show.json', {
      access_token: token,
      uid: uid
    }, function(err, res) {
      if(err) cb(err)
      cb(null, res.data)
    })
  },

  getUser: function(token, cb) {
    WeiboAPI._getUid(token, function(err, uid) {
      if(err) return cb(err)
      Weibo._getUserByUid(token, uid, function(err, user) {
        if(err) cb(err)
        cb(null, user)
      })
    })
  },

  getTimeline: function(token, cb) {
    jsonpRequest('/statuses/home_timeline.json', {
      access_token: token
    }, function(err, res) {
      if(err) cb(err)
      cb(null, res.data.statuses)
    })
  },

  // http://open.weibo.com/wiki/2/comments/show
  loadComments: function(token, id, cb) {
    jsonpRequest('/comments/show.json', {
      access_token: token,
      id: id
    }, function(err, res) {
      if(err) cb(err)
      cb(null, res.data.comments)
    })
  },

  // http://open.weibo.com/wiki/2/statuses/update
  newStatus: function(token, status, cb) {
    if(!token) throw new Error('Need token.')
    request('statuses/update', {
      access_token: token,
      status: status
    }, function(err, res) {
      if(err) cb(err)
      cb(null, res)
    })
  },

  // http://open.weibo.com/wiki/2/statuses/destroy
  destroyStatus: function(token, id, cb) {
    if(!token) throw new Error('Need token.')
    request('statuses/destroy', {
      access_token: token,
      id: id
    }, function(err, res) {
      if(err) cb(err)
      cb(null, res)
    })
  },

  // http://open.weibo.com/wiki/2/comments/create
  replyPost: function(token, id, comment, comment_ori, cb) {
    if(!token) throw new Error('Need token.')

    request('comments/create', {
      access_token: token,
      id: id,
      comment: comment,
      comment_ori: comment_ori || 0
    }, function(err, res) {
      if(err) cb(err)
      cb(null, res)
    })
  },

  // http://open.weibo.com/wiki/2/comments/reply
  replyComment: function(token, cid, pid, comment, without_mention, comment_ori, cb) {
    if(!token) throw new Error('Need token.')
    request('comments/create', {
      access_token: token,
      cid: cid,
      id: pid,
      comment: comment,
      without_mention: without_mention || 1,
      comment_ori: comment_ori || 1
    }, function(err, res) {
      if(err) cb(err)
      cb(null, res)
    })
  }
}

module.exports = WeiboAPI