/** @jsx React.DOM */
'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');

require('../../css/login.css');

var LoginPage = React.createClass({

  render() {
    return (
      <DocumentTitle title='Login'>
        <div id='login'>
          <img src="../../images/weibo_logo.png" />
          <a className="login-btn" href="/login">登录到新浪微博</a>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = LoginPage;
