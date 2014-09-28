/** @jsx React.DOM */
'use strict';

var React = require('react');
var axios = require('axios');
var Profile = require('./profile');
var Feed = require('./feed');
var weibo = require('./weibo');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      feeds: []
    };
  },

  getFeeds: weibo.getTimeline,

  componentWillMount: function() {
    this.getFeeds(function(err, feeds) {
      console.log(feeds)
      this.setState({
        feeds: feeds
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div className='container content'>
        <Profile profile={this.props.user} />
        <Feed feeds={this.state.feeds} />
      </div>
    );
  }
});
