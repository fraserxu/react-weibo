/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var login = this.props.loggedIn ?
      <a href="/logout">Logout</a> :
      <a href="/login">Login</a>

    return (
      <header>
        <div className='container'>

          <div>
            {login}
          </div>

        </div>
      </header>
    );
  }
});
