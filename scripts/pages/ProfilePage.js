/** @jsx React.DOM */
'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');

var ProfilePage = React.createClass({
  render() {

    return (
      <DocumentTitle title='Profile Page'>
        <div>
          Profile Page
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = ProfilePage;
