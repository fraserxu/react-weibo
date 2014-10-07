/** @jsx React.DOM */
'use strict';

var React = require('react');
var Feeds = require('./feeds');
var weibo = require('./weibo');
var ls = global.localStorage;
var About = require('./about');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      feeds: []
    };
  },

  getFeeds: weibo.getTimeline,

  componentWillMount: function() {
    if(this.props.loggedIn) {
      this.getFeeds(ls.getItem('weibo-access-token'), function(err, feeds) {
      this.setState({
          feeds: feeds
        });
      }.bind(this));
    }

  },

  render: function() {
    var main = this.props.loggedIn ?
      <Feeds feeds={this.state.feeds} profile={this.props.profile}/> :
      <About />
    return (
      <div className='container content'>
        {main}
      </div>
    );
  }
});
