/** @jsx React.DOM */
'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');

var AboutPage = React.createClass({
  render() {

    return (
      <DocumentTitle title='About Page'>
        <div>
          About Page
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = AboutPage;
