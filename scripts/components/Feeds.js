/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Feed = require('./Feed');
var Addons = require('react/addons')

require('../../css/feed.css');

module.exports = React.createClass({
  render: function() {
    var feeds = this.props.feeds.map(function(feed, key) {
      // filter AD
      if (!feed.promotion) return <Feed key={key} feed={feed} />
    }.bind(this))

    return (
      <div className='feeds'>
        <section className='posts'>
          <ReactCSSTransitionGroup transitionName="scale">
            {feeds}
          </ReactCSSTransitionGroup>
        </section>
      </div>
    );
  }
});
