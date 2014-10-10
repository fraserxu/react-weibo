'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var { createStore } = require('../utils/StoreUtils');

var _profile = {};

var ProfileStore = createStore({
  get() {
    return _profile
  }
});

ProfileStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  console.log('action', action)

  var response = action.response;

  console.log('response', response)

  var entities = response && response.entities;

  ProfileStore.emitChange();
})

module.exports = ProfileStore;