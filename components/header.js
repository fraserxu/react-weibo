/** @jsx React.DOM */
'use strict';

var React = require('react');
var Profile = require('./profile');
var ls = global.localStorage;

require('../css/header.css');

module.exports = React.createClass({
  logout: function() {
    ls.removeItem('weibo-access-token')
  },

  render: function() {
    var login = this.props.loggedIn ?
      <a className="logout-btn" href="#" onClick={this.logout}>Logout</a> :
      <a className="login-btn" href="/login">Login</a>

    var newPost = this.props.loggedIn ?
      <a className="login-btn" href="#" onClick={this.newPost}>Post</a> : null

    return (
      <header className="user_header">
        <div className="link-group">
          {login}
          {newPost}
          <a className="about-btn" href="#">About</a>
        </div>
        <Profile profile={this.props.profile} />
      </header>
    );
  }
});
