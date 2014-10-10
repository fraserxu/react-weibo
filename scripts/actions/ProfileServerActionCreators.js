'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var ProfileServerActionCreators = {
  handleProfileSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_PROFILE_SUCCESS,
      response: response
    })
  },

  handleProfileError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_PROFILE_ERROR
    })
  }
}

module.exports = ProfileServerActionCreators;