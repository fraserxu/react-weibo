/** @jsx React.DOM */
'use strict';

var React = require('react'),
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

  composing() {
    this.setState({composing: !this.state.composing})
  },

  logout() {
    localStorage.removeItem('accessToken')
    this.transitionTo('/login')
  },

  render() {
    var postLink = <a className="login-btn" href="#" onClick={this.composing}>Post</a>

    return (
      <header className="user_header">
        <div className="link-group">
          <a className="logout-btn" href="#" onClick={this.logout}>Logout</a>
          {postLink}
          <Link to="about">About</Link>
        </div>

      </header>
    );
  }

});

module.exports = Header;
