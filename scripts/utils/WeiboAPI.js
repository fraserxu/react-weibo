'use strict';

var ProfileServerActionCreators = require('../actions/ProfileServerActionCreators');
var FeedsServerActionCreators = require('../actions/FeedsServerActionCreators');
var {
  request,
  jsonpRequest
} = require('./APIUtils');

var TOKEN = localStorage.getItem('accessToken');

var WeiboAPI = {
  _getUid: function(token, cb) {
    token = TOKEN
    jsonpRequest('/account/get_uid.json', {
      access_token: token
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data.uid)
    })
  },

  _getUserByUid: function(token, uid, cb) {
    token = TOKEN
    jsonpRequest('/users/show.json', {
      access_token: token,
      uid: uid
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data)
    })
  },

  getUser: function() {
    var token = TOKEN
    WeiboAPI._getUid(token, function(err, uid) {
      if(err) return cb(err)
      WeiboAPI._getUserByUid(token, uid, function(err, user) {
        if(err) {
          return ProfileServerActionCreators.handleProfileError(err)
        }
        ProfileServerActionCreators.handleProfileSuccess(user)
      })
    })
  },

  getTimeline: function() {
    var token = TOKEN
    jsonpRequest('/statuses/home_timeline.json', {
      access_token: token
    }, function(err, res) {
      if(err) {
        return FeedsServerActionCreators.handleFeedsError(err)
      }
      FeedsServerActionCreators.handleFeedsSuccess(res.data.statuses)
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