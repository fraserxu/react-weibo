/** @jsx React.DOM */
'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');

var MainPage = React.createClass({
  render() {

    return (
      <DocumentTitle title='Main Page'>
        <div>
          Main Page
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = MainPage;
