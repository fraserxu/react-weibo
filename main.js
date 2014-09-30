/** @jsx React.DOM */
'use strict';

var React = require('react');
var ls = global.localStorage;
var Header = require('./components/header');
var Status = require('./components/status');
var weibo = require('./components/weibo');

require('./css/base.css')
require('./css/main.css')

var APP = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      profile: {}
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
      this.getUser(ls.getItem('weibo-access-token'), function(err, profile) {
        if(err) alert('ger profile error')
        this.setState({
          profile: profile
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

  getUser: weibo.getUser,

  render: function() {
    return (
      <div id='main-container'>
        <Header loggedIn={this.state.loggedIn} profile={this.state.profile} />
        <Status loggedIn={this.state.loggedIn} profile={this.state.profile} />
      </div>
    );
  }
});

React.renderComponent(<APP />, document.getElementById('main'));