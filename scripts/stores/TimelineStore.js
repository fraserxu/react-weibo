'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var { createStore } = require('../utils/StoreUtils');

var _timeline = [];

var TimelineStore = createStore({
  get() {
    return _timeline
  }
});

TimelineStore.dispatchToken = AppDispatcher.register(function(payload) {

  var action = payload.action;
  var response = action.response;

  if(response) {
    _timeline = response
  }

  TimelineStore.emitChange();
})

module.exports = TimelineStore;