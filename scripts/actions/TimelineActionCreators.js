'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var WeiboAPI = require('../utils/WeiboAPI');
var ActionTypes = require('../constants/ActionTypes');
var TimelineStore = require('../stores/TimelineStore');

var TimelineActionCreators = {
  requestTimeline(name) {

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_TIMELINE,
      name: name
    })

    WeiboAPI.getTimelineByName(name)
  }
}

module.exports = TimelineActionCreators;