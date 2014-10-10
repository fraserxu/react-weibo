'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var { createStore } = require('../utils/StoreUtils');

var _feeds = [];

var FeedsStore = createStore({
  get() {
    return _feeds
  }
});

FeedsStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  var response = action.response;

  if(response) {
    _feeds = response
  }

  FeedsStore.emitChange();
})

module.exports = FeedsStore;