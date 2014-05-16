angular.module('app_synth')
.controller('peopleController', function ($scope,$location,  data) {
	if(!isLogged)
		$location.path('/');
	
	$scope.people = data;
	$scope.title = "People";
});
