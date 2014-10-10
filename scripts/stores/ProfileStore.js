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
  var response = action.response;

  if(response) {
    _profile = response
  }

  ProfileStore.emitChange();
})

module.exports = ProfileStore;