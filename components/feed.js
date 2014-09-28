/** @jsx React.DOM */
'use strict';

var React = require('react');

require('../css/feed.css');

var Feed = React.createClass({
  render: function() {
    var feed = this.props.feed;
    var thumbnail = feed.thumbnail_pic ?
      <img src={feed.thumbnail_pic} alt={feed.text} /> : null
    return (
      <li>
        <img src={feed.user.profile_image_url} alt={feed.user.name} />
        <span>{feed.user.name}</span>
        <p>{feed.text}</p>
        {thumbnail}
      </li>
    )
  }
});

module.exports = React.createClass({
  render: function() {
    var feeds = this.props.feeds.map(function(feed, key) {
      return <Feed feed={feed} />
    })
    return (
      <div className='feeds'>
        <ul className='posts'>
          {feeds}
        </ul>
      </div>
    );
  }
});


