/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Header = require('./components/Header'),
    DocumentTitle = require('react-document-title'),
    { PropTypes } = React;

require('../css/base.css')
require('../css/main.css')

var App = React.createClass({
  propTypes: {
    activeRouteHandler: PropTypes.func
  },

  render() {
    return (
      <DocumentTitle title='React Weibo'>
        <div className='App' id='main-container'>
          <Header />
          <this.props.activeRouteHandler />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = App;