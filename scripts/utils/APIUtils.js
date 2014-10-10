'use strict';

var jsonp = require('jsonp');
var axios = require('axios');
var qs = require('querystring');

var API_BASE = 'https://api.weibo.com/2';

var APIUtils = {
  jsonpRequest(endpoint, params, cb) {
    endpoint = API_BASE + endpoint + '?' + qs.stringify(params)
    jsonp(endpoint, function(err, res) {
      if(err) cb(err)
      cb(null, res.data)
    })
  },

  request(endpoint, data, cb) {
    axios.post(endpoint, data)
    .then(function(response) {
      cb(null, response)
    })
    .catch(function(err) {
      cb(err)
    })
  }
}

module.exports = APIUtils;