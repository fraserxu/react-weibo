/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='retweet'>
        <a href={'http://weibo.com/' + this.props.retweeted_status.user.profile_url}>@{this.props.retweeted_status.user.name}</a>
        <p>{this.props.retweeted_status.text}</p>
        <img src={this.props.retweeted_status.original_pic} />
      </div>
    )
  }
});