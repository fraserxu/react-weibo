'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var WeiboAPI = require('../utils/WeiboAPI');
var ActionTypes = require('../constants/ActionTypes');

var FeedsActionCreators = {
  requestFeeds() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_FEEDS
    })

    WeiboAPI.getTimeline()
  }
}

module.exports = FeedsActionCreators;