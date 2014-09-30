/** @jsx React.DOM */
'use strict';

var React = require('react');
var ENTER_KEY_CODE = 13;
var weibo = require('./weibo');
var ls = global.localStorage;

module.exports = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },

  newReply: function(content) {
    var msg = typeof content === 'string' ? content : this.state.text
    weibo.replyComment(ls.getItem('weibo-access-token'), this.props.comment.id, this.props.feed.id, msg, 1, 1, function(err, res) {
      console.log('res', res.data)
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
        <button onClick={this.newReply}>Reply</button>
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
});