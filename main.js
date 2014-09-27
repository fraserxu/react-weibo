/** @jsx React.DOM */
'use strict';

var React = require('react');
// var ls = global.localStorage;
// var axios = require('axios');
// var Header = require('./components/header');
// var Status = require('./components/status');
var jsonp = require('jsonp');

var APP = React.createClass({
  getInitialState: function() {
    return {
      user: {}
    }
  },

  componentWillMount: function() {
    this.getUser()
  },

  getUser: function() {
    var uid_url = 'https://api.weibo.com/2/account/get_uid.json?access_token=2.00YwP8sBGoDixB537b1199b20i7RQn';
    jsonp(uid_url, function(err, res) {
      var uid = res.data.uid
      var user_url = 'https://api.weibo.com/2/users/show.json?access_token=2.00YwP8sBGoDixB537b1199b20i7RQn&uid=' + uid
      jsonp(user_url, function(err, res) {
        console.log('res', res)
        this.setState({user: res.data})
      }.bind(this))
    }.bind(this))
  },

  render: function() {
    var data = JSON.stringify(this.state.user, null, 4)
    return (
      <div>
        <p>This sucks!!!</p>
        <pre>{data}</pre>
      </div>
    );
  }
});

React.renderComponent(<APP />, document.body);