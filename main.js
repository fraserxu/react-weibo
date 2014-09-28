/** @jsx React.DOM */
'use strict';

var React = require('react');
// var ls = global.localStorage;
// var axios = require('axios');
// var Header = require('./components/header');
// var Status = require('./components/status');
var weibo = require('./components/weibo.js');

var APP = React.createClass({
  getInitialState: function() {
    return {
      user: {}
    }
  },

  componentWillMount: function() {
    this.getUser(function(err, user) {
      if(err) alert('ger user error')
      this.setState({
        user: user
      })
    }.bind(this))
  },

  getUser: function(cb) {
    weibo.getUid(function(err, uid) {
      weibo.getUser(uid, function(err, user) {
        if(err) return cb(err)
        cb(err, user)
      })
    })
  },

  render: function() {
    var data = JSON.stringify(this.state.user, null, 4)
    return (
      <div>
        <pre>{data}</pre>
      </div>
    );
  }
});

React.renderComponent(<APP />, document.getElementById('main'));