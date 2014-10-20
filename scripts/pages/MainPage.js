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
var { Navigation } = require('react-router');
var Spinner = require('react-spinner');
var _ = require('lodash');

require('../../css/spinner.css');


var MainPage = React.createClass({
  mixins: [createStoreMixin(ProfileStore, FeedsStore), Navigation],

  getStateFromStores() {
    var profile = ProfileStore.get();
    var feeds = FeedsStore.get();

    return {
      profile: profile,
      feeds: feeds
    }
  },

  componentWillMount: function() {
    var loggedIn = !!localStorage.getItem('accessToken')
    if (!loggedIn) this.transitionTo('/login')
  },

  componentDidMount: function() {
    this.profileDidChange();
  },

  componentWillReceiveProps(nextProps) {

  },

  profileDidChange(props) {
    ProfileActionCreators.requestProfile()
    FeedsActionCreators.requestFeeds()
  },

  render() {
    var {feeds, profile} = this.state;

    var profileComponent = profile === 'undefined' ?
      <Profile profile={profile} /> : null

    return (
      <DocumentTitle title='Main Page'>
        <div>
          {profileComponent}

          {_.isEmpty(feeds) &&
            <Spinner />
          }

          <Feeds feeds={feeds} profile={profile} />

          {this.loadMore()}

        </div>
      </DocumentTitle>
    )
  },

  loadMore() {
    var isFetching = false

    return (
      <div className='load-more'>
        <button onClick={this.handleLoadMoreClick}
          disabled={isFetching}>
          {isFetching ? 'Loading' : 'Load more' }
        </button>
      </div>
    )
  },

  handleLoadMoreClick() {

  }
});

module.exports = MainPage;
