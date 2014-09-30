/** @jsx React.DOM */
'use strict';

var React = require('react');
var weibo = require('./weibo');
var ENTER_KEY_CODE = 13;
var ls = global.localStorage;
var Timestamp = require('react-time');

require('../css/feed.css');

var Feed = React.createClass({
  destroyStatus: function() {
    weibo.destroyStatus(ls.getItem('weibo-access-token'), this.props.feed.id, function(err, data) {
      console.log('destroy', data)
    })
  },

  render: function() {
    var feed = this.props.feed;
    var profile = this.props.profile;
    var thumbnail = feed.thumbnail_pic ?
      <img src={feed.thumbnail_pic} alt={feed.text} /> : null

    var deleteButton = profile.name == feed.user.name ?
      <button className="delete-btn" onClick={this.destroyStatus}>Delete</button> : null

    return (
      <article className='post'>
        {deleteButton}

        <div className='post-avatar'>
          <span className='avatar-container'>
            <img src={feed.user.profile_image_url} alt={feed.user.name} />
          </span>
        </div>

        <div className='post-content'>
          <p>{feed.text}</p>
          {thumbnail}
        </div>

        <div className='postbar'>
          <Timestamp value={new Date(feed.created_at)} relative />
          <span className='like-count'>Like ({feed.attitudes_count})</span>
          <span className='reposts-count'>Reposts ({feed.reposts_count})</span>
          <span className='comments-count'>Comment ({feed.comments_count})</span>
        </div>

      </article>
    )
  }
});

var NewPost = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  send: function(content) {
    var msg = typeof content === 'string' ? content : this.state.text
    weibo.newStatus(ls.getItem('weibo-access-token'), msg, function(err, res) {
      console.log(res.data)
    })
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
      return <Feed profile={this.props.profile} key={key} feed={feed} />
    }.bind(this))
    return (
      <div>
        <NewPost />
        <section className='posts'>
          {feeds}
        </section>
      </div>
    );
  }
});


