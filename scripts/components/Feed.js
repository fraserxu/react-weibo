/** @jsx React.DOM */
'use strict';

var React = require('react');
var Comments = require('./Comments');
var Timestamp = require('react-time');
var WeiboAPI = require('../utils/WeiboAPI');
var ReTweet = require('./ReTweet');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      comments: [],
      commentsLoaded: false
    };
  },

  destroyStatus: function() {
    WeiboAPI.destroyStatus(this.props.feed.id, function(err, data) {
      console.log('destroy', data)
    })
  },

  loadComments: function() {
    this.setState({
      commentsLoaded: !this.state.commentsLoaded
    })
    WeiboAPI.loadComments(this.props.feed.id, function(err, data) {
      this.setState({
        comments: data
      })
    }.bind(this))
  },

  scaleImg: function() {
    var img = this.refs.thumbnail_pic.getDOMNode();
    img.src = this.props.feed.original_pic;
  },

  render: function() {
    var thumbnail = this.props.feed.thumbnail_pic ?
      <img ref='thumbnail_pic' onClick={this.scaleImg} src={this.props.feed.thumbnail_pic} alt={this.props.feed.text} /> : null

    var deleteButton = this.props.profile.name == this.props.feed.user.name ?
      <button className="delete-btn" onClick={this.destroyStatus}>Delete</button> : null

    var retweet = this.props.feed.retweeted_status ? <ReTweet retweeted_status={ this.props.feed.retweeted_status } /> : null

    return (
      <article className='post'>
        {deleteButton}

        <div className='post-avatar'>
          <span className='avatar-container'>
            <img src={this.props.feed.user.profile_image_url} alt={this.props.feed.user.name} />
          </span>
        </div>

        <div className='post-content'>
          <p>{this.props.feed.text}</p>
          {thumbnail}
          {retweet}
        </div>

        <div className='postbar'>
          <Timestamp value={new Date(this.props.feed.created_at)} relative />
          <span className='like-count'>Like ({this.props.feed.attitudes_count})</span>
          <span className='reposts-count'>Reposts ({this.props.feed.reposts_count})</span>
          <span className='comments-count'>Comment (<a onClick={this.loadComments}>{this.props.feed.comments_count}</a>)</span>
        </div>

        <Comments feed={this.props.feed} comments={this.state.comments} commentsLoaded={this.state.commentsLoaded}/>
      </article>
    )
  }
});