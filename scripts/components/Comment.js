/** @jsx React.DOM */
'use strict';

var React = require('react');
var NewReplyComment = require('./NewCommentReply');
var Timestamp = require('react-time');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      creatingReply: false
    };
  },

  replyComment: function(e) {
    e.preventDefault();
    this.setState({ creatingReply: !this.state.creatingReply});
  },

  render: function() {
    var newReplyComment = this.state.creatingReply ?
      <NewReplyComment comment={this.props.comment} feed={this.props.feed} /> : null

    return (
      <li className='comment'>
        <div className='comment-header'>
          <img src={this.props.comment.user.profile_image_url} alt={this.props.comment.user.name} />
        </div>
        <div className='comment-body'>
          <a href={'http://weibo.com/' + this.props.comment.user.profile_url}>@{this.props.comment.user.name}</a>
          <p>{this.props.comment.text}</p>
          <Timestamp value={new Date(this.props.comment.created_at)} relative />
          <a className='reply' href='#' onClick={this.replyComment}>Reply</a>
        </div>
        {newReplyComment}
      </li>
    )
  }
});