/** @jsx React.DOM */
'use strict';

var React = require('react');
var Profile = require('../components/Profile');
var Feeds = require('../components/Feeds');
var ProfileActionCreators = require('../actions/ProfileActionCreators');
var FeedsActionCreators = require('../actions/FeedsActionCreators');
var createStoreMixin = require('../mixins/createStoreMixin');
var ProfileStore = require('../stores/ProfileStore');
var FeedsStore = require('../stores/FeedsStore');
var DocumentTitle = require('react-document-title');

var MainPage = React.createClass({
  mixins: [createStoreMixin(ProfileStore, FeedsStore)],

  getStateFromStores(props) {
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
    var {feeds, profile} = this.state;
    return (
      <DocumentTitle title='Main Page'>
        <div>
          <Profile profile={profile} />
          <Feeds feeds={feeds} profile={profile} />
        </div>
      </DocumentTitle>
    )
  }
});

module.exports = MainPage;
