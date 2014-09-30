var express = require('express');
var app = express();
var passport = require('passport');
var WeiboStrategy = require('passport-weibo').Strategy;
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./config.json');
var request = require('request');
var qs = require('querystring');

var API_BASE = 'https://api.weibo.com/2'

// middleware
app.use(express.static(path.join(__dirname, '.')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new WeiboStrategy({
    clientID: config.weibo.appkey,
    clientSecret: config.weibo.secret,
    callbackURL: config.weibo.oauth_callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    profile.authInfo = {
      'accessToken': accessToken,
      'refreshToken': refreshToken
    }
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


app.get('/login', passport.authenticate('weibo'), function(req, res){ });

app.get('/auth/weibo/callback', passport.authenticate('weibo', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/?accessToken=' + req.user.authInfo.accessToken);
});

// forward any post reqeust to weibo api
app.post('*', function(req, res) {
  request.post({
    url: API_BASE + req.url + '.json?' + qs.stringify(req.body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': qs.stringify(req.body).length
    }
  }, function(err, response, body) {
    console.log('server response', response)
    if(err) return console.log(err)
    if (!err && response.statusCode == 200) {
      res.json(JSON.parse(body))
    }
  })
});

var port = process.env.PORT || 8000;

var server = app.listen(port, function() {
  console.log('server running on port ', port)
})
