/** @jsx React.DOM */
'use strict';

var React = require('react');
var Comment = require('./Comment');
var NewComment = require('./NewComment');

module.exports = React.createClass({
  render: function() {
    if(!this.props.commentsLoaded) return null;

    var comments = (this.props.comments.length > 0) ?
      this.props.comments.map(function(comment, key) {
        return <Comment key={key} comment={comment} feed={this.props.feed} />
      }.bind(this)) :
      <li>No comment yet.</li>

    return (
      <div className='comments'>
        <NewComment feed={this.props.feed} />
        <ul>{comments}</ul>
      </div>
    )
  }
});