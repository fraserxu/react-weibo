/** @jsx React.DOM */
'use strict';

var React = require('react');
var ProfileActionCreators = require('../actions/ProfileActionCreators');
var FeedsActionCreators = require('../actions/FeedsActionCreators');
var createStoreMixin = require('../mixins/createStoreMixin');
var ProfileStore = require('../stores/ProfileStore');
var FeedsStore = require('../stores/FeedsStore');
var DocumentTitle = require('react-document-title');

var MainPage = React.createClass({
  mixins: [createStoreMixin(ProfileStore, FeedsStore)],

  getStateFromStores(props) {
    console.log('getStateFromStores props', props)
    var profile = ProfileStore.get();
    var feeds = FeedsStore.get();

    return {
      profile: profile,
      feeds: feeds
    }
  },

  componentDidMount: function() {
    this.profileDidChange(this.props);
  },

  componentWillReceiveProps(nextProps) {

  },

  profileDidChange(props) {
    ProfileActionCreators.requestProfile()
    FeedsActionCreators.requestFeeds()
  },

  render() {
    return (
      <DocumentTitle title='Main Page'>
        <div>
          Main Page
        </div>
      </DocumentTitle>
    )
  }
});

module.exports = MainPage;
