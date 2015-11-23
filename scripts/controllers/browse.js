/*jslint node: true */
/*global angular*/
/*global app*/
'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Task, Auth) {

	$scope.searchTask = '';
	$scope.tasks = Task.all;
	$scope.signedIn = Auth.signedIn;
	$scope.listMode = true;

	if($routeParams.taskId) {
		var task = Task.getTask($routeParams.taskId).$asObject();
		$scope.listMode = false;
		setSelectedTask(task);
	}

	function setSelectedTask(task) {
		$scope.setSelectedTask = task;

		if($scope.signedIn()) {
			$scope.isTaskCreator = Task.isTaskCreator;
			$scope.isOpen = Task.isOpen;
		}
	}

	$scope.cancelTask = function(taskId) {
		Task.cancelTask(taskId).then(function() {
			toaster.pop('success', 'This task is cancelled successfully.');
		});
	};

});