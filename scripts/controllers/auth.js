/*jslint node: true */
/*global angular*/
/*global app*/
/*global Firebase*/
/*global toaster*/
'use strict';

app.controller('AuthController', function($scope, $location, Auth) {

	if(Auth.signedIn()) {
		$location.path('/');
	}

	$scope.register	= function(user) {
		Auth.register(user).then(function(){
			toaster.pop('success', 'Registered successfully!');
			console.log("Register successfully!");
			$location.path('/');
		}, function(err) {
			toaster.pop('error', 'Oops, something went wrong!');
			console.log("Error...");
		});
	};

	$scope.login = function(user) {
		Auth.login(user).then(function(){
			toaster.pop('success', 'Logged in successfully!');
			console.log("Logged in successfully!");
			$location.path('/');
		}, function(err) {
			toaster.pop('error', 'Oops, something went wrong!');
			console.log("Error...");
		});
	};

	$scope.changePassword = function(user) {
		Auth.changePassword(user).then(function(){

			// Reset form
			$scope.user.email = '';
			$scope.user.oldPass = '';
			$scope.user.newPass = '';

			toaster.pop('success', 'Changed password successfully');
			console.log("Password changed successfully!");
		}, function(err) {
			console.log("Error...");
		});
	};

});