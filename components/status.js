/** @jsx React.DOM */
'use strict';

var React = require('react');
var axios = require('axios');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    };
  },

  getPosts: function(props) {
    props = props || this.props;
  },

  componentWillMount: function() {
    this.getPosts();
  },

  componentWillReceiveProps: function(nextProps) {
    this.getPosts(nextProps);
  },

  render: function() {
    return (
      <div className='container content'>
        <ul className='posts'>

        </ul>
      </div>
    );
  }
});
