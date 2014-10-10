'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var WeiboAPI = require('../utils/WeiboAPI');
var ActionTypes = require('../constants/ActionTypes');


var ActionCreators = {
  requestProfile(name) {
    if (ProfileStore.contains(name)) {
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_PROFILE,
      name: name
    });

    WeiboAPI.requestProfile(name)
  },

  requestFeeds() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_FEEDS
    })

    WeiboAPI.requestFeeds()
  }
}

module.exports = ActionCreators;