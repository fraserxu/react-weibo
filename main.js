/** @jsx React.DOM */
'use strict';

var React = require('react');
var Header = require('./components/header');
var Status = require('./components/status');

require('./css/typography.css')
require('./css/styles.css')

var APP = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <Status />
      </div>
    );
  }
});

React.renderComponent(<APP />, document.body);