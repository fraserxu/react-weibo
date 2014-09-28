/** @jsx React.DOM */
'use strict';

var React = require('react');

require('../css/profile.css');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='profile'>
        <img src={this.props.profile.avatar_large} alt={this.props.profile.screen_name} />
        <a href={'weibo.com/' + this.props.profile.profile_url}>{this.props.profile.screen_name}</a>
        <p>{this.props.profile.description}</p>
      </div>
    );
  }
});


