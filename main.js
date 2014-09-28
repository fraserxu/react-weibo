/** @jsx React.DOM */
'use strict';

var React = require('react');
var ls = global.localStorage;
// var axios = require('axios');
var Header = require('./components/header');
var Status = require('./components/status');
var weibo = require('./components/weibo');

require('./css/typography.css')
require('./css/styles.css')

var APP = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      user: {}
    };
  },
  componentWillMount: function() {
    this.checkLogin()

    var accessToken = window.location.search.replace('?accessToken=', '')
    if(accessToken) {
      ls.setItem('weibo-access-token', accessToken)
      this.setLogin(true)
    }
  },

  checkLogin: function() {
    if(ls.getItem('weibo-access-token')) {
      // this.getUser(ls.getItem('weibo-access-token'))
      this.getUser(function(err, user) {
        if(err) alert('ger user error')
        this.setState({
          user: user
        })
      }.bind(this))
      this.setLogin(true)
    }
  },

  setLogin: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  getUser: function(cb) {
    weibo.getUid(function(err, uid) {
      weibo.getUserByUid(uid, function(err, user) {
        if(err) return cb(err)
        cb(err, user)
      })
    })
  },

  render: function() {
    return (
      <div>
        <Header loggedIn={this.state.loggedIn} user={this.state.user} />
        <Status user={this.state.user} />
      </div>
    );
  }
});

React.renderComponent(<APP />, document.getElementById('main'));