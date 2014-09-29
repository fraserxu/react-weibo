/** @jsx React.DOM */
'use strict';

var React = require('react');
var weibo = require('./weibo');
var ENTER_KEY_CODE = 13;
var ls = global.localStorage;

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

var NewPost = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  send: function(content) {
    var msg = typeof content === 'string' ? content : this.state.text
    weibo.newStatus(ls.getItem('weibo-access-token'), msg)
  },
  render: function() {
    return (
      <div className='new'>
        <textarea
          name="message"
          palceholder="What's up?"
          value={this.state.text}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          rows="5"
          cols="80"
        />
        <button onClick={this.send}>Send</button>
      </div>
    )
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      var text = this.state.text.trim();
      if (text) {
        this.send(text);
      }
      this.setState({text: ''});
    }
  }
})

module.exports = React.createClass({
  render: function() {
    var feeds = this.props.feeds.map(function(feed, key) {
      return <Feed feed={feed} />
    })
    return (
      <div className='feeds'>
        <NewPost />
        <ul className='posts'>
          {feeds}
        </ul>
      </div>
    );
  }
});


