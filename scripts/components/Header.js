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

  composing: function() {
    this.setState({composing: !this.state.composing})
  },

  render() {
    var login = this.props.loggedIn ?
      <a className="logout-btn" href="#" onClick={this.logout}>Logout</a> :
      <a className="login-btn" href="/login">Login</a>

    var postLink = <a className="login-btn" href="#" onClick={this.composing}>Post</a>

    return (
      <header className="user_header">
        <div className="link-group">
          {login}
          {postLink}
          <Link to="about">About</Link>
        </div>

      </header>
    );
  }

});

module.exports = Header;
