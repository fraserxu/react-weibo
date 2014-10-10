/** @jsx React.DOM */
'use strict';

var React = require('react');
var Feed = require('./Feed');

require('../../css/feed.css');

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
