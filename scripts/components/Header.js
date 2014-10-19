/** @jsx React.DOM */
'use strict';

var React = require('react'),
  NewPost = require('./NewPost'),
  Router = require('react-router'),
  Link = Router.Link,
  { Navigation } = require('react-router');

require('../../css/header.css');

var Header = React.createClass({
  mixins: [Navigation],

  getInitialState() {
    return {
      composing: false
    };
  },

  composing(e) {
    e.preventDefault()
    this.setState({composing: !this.state.composing})
  },

  logout(e) {
    e.preventDefault()
    localStorage.removeItem('accessToken')
    this.transitionTo('/login')
  },

  render() {
    var postLink = <a className="login-btn" href="#" onClick={this.composing}>Post</a>

    var newPost = this.state.composing ?
      <NewPost /> : null

    return (
      <header className="user_header">

        <Link to="main" className="logo-group">
          <img className="logo" src="../../images/weibo_logo.png" />
        </Link>

        <div className="link-group">
          <Link to="about">About</Link>
          <a className="logout-btn" href="#" onClick={this.logout}>Logout</a>
          {postLink}
        </div>

        {newPost}

      </header>
    );
  }

});

module.exports = Header;
