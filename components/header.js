/** @jsx React.DOM */
'use strict';

var React = require('react');
var Profile = require('./profile');

require('../css/header.css');

module.exports = React.createClass({
  render: function() {
    var login = this.props.loggedIn ?
      <a className="logout-btn" href="/logout">Logout</a> :
      <a className="login-btn"href="/login">Login</a>

    return (
      <header className="user_header">
        {login}
        <Profile profile={this.props.profile} />
      </header>
    );
  }
});
