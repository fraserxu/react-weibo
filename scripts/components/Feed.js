/** @jsx React.DOM */
'use strict';

var React = require('react');
var Comments = require('./Comments');
var Timestamp = require('react-time');
// var weibo = require('./weibo');
var ls = global.localStorage;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      comments: [],
      commentsLoaded: false
    };
  },

  destroyStatus: function() {
    // weibo.destroyStatus(ls.getItem('weibo-access-token'), this.props.feed.id, function(err, data) {
    //   console.log('destroy', data)
    // })
  },

  loadComments: function() {
    this.setState({
      commentsLoaded: !this.state.commentsLoaded
    })
    // weibo.loadComments(ls.getItem('weibo-access-token'), this.props.feed.id, function(err, data) {
    //   this.setState({
    //     comments: data
    //   })
    // }.bind(this))
  },

  render: function() {
    var thumbnail = this.props.feed.thumbnail_pic ?
      <img src={this.props.feed.thumbnail_pic} alt={this.props.feed.text} /> : null

    var deleteButton = this.props.profile.name == this.props.feed.user.name ?
      <button className="delete-btn" onClick={this.destroyStatus}>Delete</button> : null

    // if(this.props.feed.retweeted_status) {
    //   console.log(this.props.feed.retweeted_status)
    // }

    var retweet = this.props.feed.retweeted_status ?
      <div className='retweet'><a href={'http://weibo.com/' + this.props.feed.retweeted_status.user.profile_url}>@{this.props.feed.retweeted_status.user.name}</a><p>{this.props.feed.retweeted_status.text}</p> <img src={this.props.feed.retweeted_status.original_pic}/></div>: null

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