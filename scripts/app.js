/*jslint node: true */
'use strict';

var app = angular
	.module('TaskNinjaApp'), [
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
      .otherwise({
        redirectTo: '/'
      });
  });
