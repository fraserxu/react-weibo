'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');

var TimelineServerActionCreators = {
  handleTimelineSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_TIMELINE_SUCCESS,
      response: response
    })
  },

  handleTimelineError(err) {
    console.log(err);

    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_TIMELINE_ERROR
    })
  }
}

module.exports = TimelineServerActionCreators;