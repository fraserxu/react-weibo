/** @jsx React.DOM */
'use strict';

var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var App = require('./App');
var AboutPage = require('./pages/AboutPage');
var ProfilePage = require('./pages/ProfilePage');
var MainPage = require('./pages/MainPage');
var AuthPage = require('./pages/AuthPage');
var LoginPage = require('./pages/LoginPage');

module.exports = (
  <Routes>
    <Route name='auth' path='auth' handler={AuthPage} />
    <Route name='login' path='login' handler={LoginPage} />
    <Route name='home' path='/' handler={App}>
      <Route name='profile' path='profile/:name' handler={ProfilePage} />
      <Route name='about' path='about' handler={AboutPage} />
      <DefaultRoute name='main' handler={MainPage} />
    </Route>
  </Routes>
);
