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

  console.log('action', action)

  var response = action.response;

  console.log('response', response)

  var entities = response && response.entities;

  FeedsStore.emitChange();
})

module.exports = FeedsStore;