/** @jsx React.DOM */
'use strict';

var React = require('react');
var ENTER_KEY_CODE = 13;

module.exports = React.createClass({
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