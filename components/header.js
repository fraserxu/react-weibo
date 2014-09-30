/** @jsx React.DOM */
'use strict';

var React = require('react');
var Profile = require('./profile');
var ls = global.localStorage;
var NewPost = require('./newPost');

require('../css/header.css');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      composing: false
    };
  },

  logout: function() {
    ls.removeItem('weibo-access-token')
  },

  composing: function() {
    this.setState({composing: !this.state.composing})
  },

  render: function() {
    var login = this.props.loggedIn ?
      <a className="logout-btn" href="#" onClick={this.logout}>Logout</a> :
      <a className="login-btn" href="/login">Login</a>

    var postLink = this.props.loggedIn ?
      <a className="login-btn" href="#" onClick={this.composing}>Post</a> : null

    var newPostBox = this.state.composing ?
      <NewPost /> : null

    return (
      <header className="user_header">
        <div className="link-group">
          {login}
          {postLink}
          <a className="about-btn" href="#">About</a>
        </div>

        {newPostBox}

        <Profile profile={this.props.profile} />
      </header>
    );
  }
});
