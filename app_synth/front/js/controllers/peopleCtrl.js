angular.module('app_synth')
.controller('peopleController', function ($scope, data) {
	$scope.people = data;
	$scope.title = "People";
});
