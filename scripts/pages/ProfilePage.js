/** @jsx React.DOM */
'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');
var TimelineActionCreators = require('../actions/TimelineActionCreators');
var ProfileActionCreators = require('../actions/ProfileActionCreators');
var TimelineStore = require('../stores/TimelineStore');
var ProfileStore = require('../stores/ProfileStore');
var createStoreMixin = require('../mixins/createStoreMixin');
var Feeds = require('../components/Feeds');
var Profile = require('../components/Profile');

var ProfilePage = React.createClass({
  mixins: [createStoreMixin(ProfileStore, TimelineStore)],

  parseScreenName(props) {
    props = props || this.props;
    return props.params.name;
  },

  getStateFromStores(props) {
    var screen_name = this.parseScreenName(props);
    var timeline = TimelineStore.get();
    var profile = ProfileStore.get();

    return {
      profile: profile,
      timeline: timeline
    }
  },

  componentDidMount: function() {
    this.timelineDidChange(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.parseScreenName(nextProps) !== this.parseScreenName(this.props)) {
      this.setState(this.getStateFromStores(nextProps));
      this.timelineDidChange(nextProps);
    }
  },

  timelineDidChange(props) {
    var screen_name = this.parseScreenName(props);

    TimelineActionCreators.requestTimeline(screen_name);
    ProfileActionCreators.requestProfileById(screen_name);
  },

  render() {
    var {timeline, profile} = this.state;
    return (
      <DocumentTitle title='User Profile'>
        <div>
          <Profile profile={profile} />
          <Feeds feeds={timeline} />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = ProfilePage;
