var express = require('express');
var app = express();
var passport = require('passport');
var WeiboStrategy = require('passport-weibo').Strategy;
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./config.json');

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
  console.log('req', req.user)
  res.redirect('/');
});

var server = app.listen(8000, function() {
  console.log('server running on port 8000')
})
