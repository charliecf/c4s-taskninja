/*jslint node: true */
/*global angular*/
'use strict';

var app = angular
	.module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase'
	])
  .constant('FURL', 'https://c4s-taskninja.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'TaskController'
      })
      .when('/edit/:taskId', {
        templateUrl: 'views/edit.html',
        controller: 'TaskController'
      })
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'TaskController'        
      })
      .otherwise({
        redirectTo: '/'
      });
  });
