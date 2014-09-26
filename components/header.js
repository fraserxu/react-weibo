/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <header>
        <div className='container'>

          <div>
            <a href="/login?type=weibo">Login</a>
          </div>

        </div>
      </header>
    );
  }
});
