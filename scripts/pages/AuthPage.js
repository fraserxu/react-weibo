/** @jsx React.DOM */
'use strict';

var React = require('react');
var { Navigation } = require('react-router');
var DocumentTitle = require('react-document-title');

require('../../css/redirect.css');

var AuthPage = React.createClass({

  mixins: [Navigation],

  componentWillMount: function() {

    if (this.props.query.accessToken) {
      // clean before set
      if (localStorage.getItem('accessToken')) localStorage.removeItem('accessToken')
      localStorage.setItem('accessToken', this.props.query.accessToken)

      this.transitionTo('/')
    }
  },

  render() {

    return (
      <DocumentTitle title='Auth'>
        <div id='redirecting'>
          登录成功，页面跳转中...
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = AuthPage;
