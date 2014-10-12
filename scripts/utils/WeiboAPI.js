'use strict';

var ProfileServerActionCreators = require('../actions/ProfileServerActionCreators');
var FeedsServerActionCreators = require('../actions/FeedsServerActionCreators');
var TimelineServerActionCreators = require('../actions/TimelineServerActionCreators');
var {
  request,
  jsonpRequest
} = require('./APIUtils');

var TOKEN = localStorage.getItem('accessToken');

var WeiboAPI = {
  _getUid: function(cb) {
    var token = TOKEN
    jsonpRequest('/account/get_uid.json', {
      access_token: token
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data.uid)
    })
  },

  getUserByUid: function(uid, cb) {
    var token = TOKEN
    jsonpRequest('/users/show.json', {
      access_token: token,
      uid: uid
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data)
    })
  },

  getUserByName: function(token, name, cb) {
    var token = TOKEN
    jsonpRequest('/users/show.json', {
      access_token: token,
      screen_name: name
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data)
    })
  },

  getUser: function() {
    WeiboAPI._getUid(function(err, uid) {
      if(err) return cb(err)
      WeiboAPI.getUserByUid(uid, function(err, user) {
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

  // uid or screen_name
  // http://open.weibo.com/wiki/2/statuses/user_timeline
  getTimelineByName: function(name) {
    var token = TOKEN
    jsonpRequest('/statuses/user_timeline.json', {
      access_token: token,
      screen_name: name
    }, function(err, res) {
      if(err) {
        return TimelineServerActionCreators.handleTimelineError(err)
      }
      TimelineServerActionCreators.handleTimelineSuccess(res.data.statuses)
    })
  },

  // http://open.weibo.com/wiki/2/comments/show
  loadComments: function(id, cb) {
    var token = TOKEN
    jsonpRequest('/comments/show.json', {
      access_token: token,
      id: id
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data.comments)
    })
  },

  // http://open.weibo.com/wiki/2/statuses/update
  newStatus: function(status, cb) {
    var token = TOKEN
    request('statuses/update', {
      access_token: token,
      status: status
    }, function(err, res) {
      if(err) return cb(err)
      cb(null, res)
    })
  },

  // http://open.weibo.com/wiki/2/statuses/destroy
  destroyStatus: function(id, cb) {
    var token = TOKEN
    request('statuses/destroy', {
      access_token: token,
      id: id
    }, function(err, res) {
      if(err) return cb(err)
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
      if(err) return cb(err)
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
      if(err) return cb(err)
      cb(null, res)
    })
  }
}

module.exports = WeiboAPI