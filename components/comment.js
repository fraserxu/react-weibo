/** @jsx React.DOM */
'use strict';

var React = require('react');
var NewReplyComment = require('./newCommentReply');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      creatingReply: false
    };
  },

  replyComment: function() {
    this.setState({ creatingReply: !this.state.creatingReply});
  },

  render: function() {
    var comment = this.props.comment;

    var newReplyComment = this.state.creatingReply ?
      <NewReplyComment comment={this.props.comment} feed={this.props.feed} /> : null

    return (
      <li>
        <div className='comment-avatar'>
          <img src={comment.user.profile_image_url} alt={comment.user.name} />
        </div>
        <div className='comment-body'>
          <a href={'http://weibo.com/' + comment.user.profile_url}>@{comment.user.name}</a>
          <p>{comment.text}</p>
          <button onClick={this.replyComment}>Reply</button>
        </div>
        {newReplyComment}
      </li>
    )
  }
});