/** @jsx React.DOM */
'use strict';

var React = require('react'),
    { Navigation } = require('react-router');

require('../../css/header.css');

var Header = React.createClass({
  mixins: [Navigation],

  // getInitialState() {
  //   return {
  //     loginOrRepo: 'gaearon'
  //   };
  // },

  render() {
    var login = this.props.loggedIn ?
      <a className="logout-btn" href="#" onClick={this.logout}>Logout</a> :
      <a className="login-btn" href="/login">Login</a>

    var postLink = this.props.loggedIn ?
      <a className="login-btn" href="#" onClick={this.composing}>Post</a> : null

    return (
      <header className="user_header">
        <div className="link-group">
          {login}
          {postLink}
          <a className="about-btn" href="#">About</a>
        </div>

      </header>
    );
  }

  // handleGoClick() {
  //   this.transitionTo('/' + this.state.loginOrRepo);
  // }
});

module.exports = Header;
