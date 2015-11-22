/*jslint node: true */
/*global app*/
/*global Firebase*/
'use strict';

app.controller('TaskController', function($scope, FURL, $firebase, $location, $routeParams) {
	var ref = new Firebase(FURL);
	var fbTasks = $firebase(ref.child('task')).$asArray();
	var taskId = $routeParams.taskId;

	console.log("Length = " + fbTasks.length);

	if(taskId) {
		$scope.selectedTask = getTask(taskId);
	}

	function getTask(taskId) {
		return $firebase(ref.child('task').child(taskId)).$asObject();
	}

	$scope.updateTask = function(task) {
		$scope.selectedTask.$save(task);
		$location.path('/browse');
	};

	$scope.tasks = fbTasks;

	$scope.postTask = function(task) {
		fbTasks.$add(task);
		console.log(task);
		$location.path('/browse');
	};

});