'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var FeedsServerActionCreators = {
  handleFeedsSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_FEEDS_SUCCESS,
      response: response
    })
  },

  handleFeedsError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_FEEDS_ERROR
    })
  }
}

module.exports = FeedsServerActionCreators;