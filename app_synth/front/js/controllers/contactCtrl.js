angular.module('app_synth')
.controller('contactCtrl', function ($scope, $location) {
	if(!isLogged)
		$location.path('/');

	$scope.contact = 'hey';
});