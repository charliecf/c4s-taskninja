/*jslint node: true */
/*global angular*/
'use strict';

var app = angular
	.module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    'toaster',
    'angularMoment'
	])
  .constant('FURL', 'https://c4s-taskninja.firebaseio.com/')
  .run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // We can catch the error when the $requireAuth promise is rejected
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'
      })
      .when('/browse/:taskId', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'        
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      }) 
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
