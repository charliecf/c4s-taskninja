/*jslint node: true */
/*global angular*/
'use strict';

var app = angular
	.module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    'toaster'
	])
  .constant('FURL', 'https://c4s-taskninja.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/browse.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      }) 
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'TaskController'        
      })
      .otherwise({
        redirectTo: '/'
      });
  });
