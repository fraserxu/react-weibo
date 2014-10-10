'use strict';

var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var PayloadSources = require('../constants/PayloadSources');

var AppDispatcher = copyProperties(new Dispatcher(), {
  handleServerAction(action) {
    console.log('server action', action)

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.')
    }

    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewACtion(action) {
    console.log('view action', action);

    if (!action.type) {
      throw new Error('Empty action.type: you likely mistyped the action.')
    }

    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    })
  }

})