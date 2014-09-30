/** @jsx React.DOM */
'use strict';

var React = require('react');
var weibo = require('./weibo');
var ls = global.localStorage;
var Feed = require('./feed');

require('../css/feed.css');

module.exports = React.createClass({
  render: function() {
    var feeds = this.props.feeds.map(function(feed, key) {
      return <Feed profile={this.props.profile} key={key} feed={feed} />
    }.bind(this))

    return (
      <div className='feeds'>
        <section className='posts'>
          {feeds}
        </section>
      </div>
    );
  }
});
