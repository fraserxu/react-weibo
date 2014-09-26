var express = require('express');
var app = express();
var weibo = require('weibo');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./config.json');

weibo.init('weibo', config.weibo.appkey, config.weibo.secret);

app.use(express.static(path.join(__dirname, '.')));
app.use(bodyParser.json());

app.post('login', function(req, res) {

});

var server = app.listen(8000, function() {
  console.log('server running on port 8000')
})
