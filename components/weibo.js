var jsonp = require('jsonp');

module.exports = {
  getUid: function(cb) {
    var uid_url = 'https://api.weibo.com/2/account/get_uid.json?access_token=2.00YwP8sBGoDixB537b1199b20i7RQn';
    jsonp(uid_url, function(err, res) {
      if(err) return cb(err)
      cb(null, res.data.uid)
    })
  },

  getUserByUid: function(uid, cb) {
    var user_url = 'https://api.weibo.com/2/users/show.json?access_token=2.00YwP8sBGoDixB537b1199b20i7RQn&uid=' + uid
    jsonp(user_url, function(err, res) {
      if(err) cb(err)
      cb(null, res.data)
    })
  }
}