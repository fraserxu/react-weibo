/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      isImgScaled: false
    };
  },

  scaleImg: function() {
    var img = this.refs.thumbnail_pic.getDOMNode();
    this.setState({
      isImgScaled: !this.state.isImgScaled
    })
    if (!this.state.isImgScaled) {
      img.className = 'scaled'
      img.src = this.props.retweeted_status.original_pic;
    } else {
      img.className = ''
      img.src = this.props.retweeted_status.thumbnail_pic;
    }
  },

  render: function() {
    return (
      <div className='retweet'>
        <a href={'http://weibo.com/' + this.props.retweeted_status.user.profile_url}>@{this.props.retweeted_status.user.name}</a>
        <p>{this.props.retweeted_status.text}</p>
        <img ref='thumbnail_pic' onClick={this.scaleImg} src={this.props.retweeted_status.thumbnail_pic} />
      </div>
    )
  }
});