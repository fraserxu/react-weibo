/** @jsx React.DOM */
'use strict';

var React = require('react');
var Comment = require('./Comment');
var NewComment = require('./NewComment');

require('../../css/comment.css');

module.exports = React.createClass({
  render: function() {
    var comments = (this.props.comments.length > 0) ?
      this.props.comments.map(function(comment, key) {
        return <Comment key={key} comment={comment} feed={this.props.feed} />
      }.bind(this)) :
      <li>No comment yet.</li>

    return (
      <div className='post-comment'>
        <NewComment feed={this.props.feed} />
        <ul className='comments'>{comments}</ul>
      </div>
    )
  }
});