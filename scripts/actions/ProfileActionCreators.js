'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var WeiboAPI = require('../utils/WeiboAPI');
var ActionTypes = require('../constants/ActionTypes');
var ProfileStore = require('../stores/ProfileStore');

var ProfileActionCreators = {
  requestProfile() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_PROFILE
    });

    WeiboAPI.getUser()
  },

  requestProfileById(id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_PROFILE
    });

    WeiboAPI.getUserByUid(id)
  }
}

module.exports = ProfileActionCreators;