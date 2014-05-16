angular
	.module('app_synth')
	.controller('postCtrl', function ($scope, $http, $route, $location, data){
		if(!isLogged)
			$location.path('/');

		$scope.hide_alert= true;
		$scope.title = 'Administration';
		$scope.people = data;
		
		$scope.save = function(){
			$http.post('/api/people', {content: $scope.people});
			$scope.result = "Done";
			$scope.hide_alert = false;
		}
		$scope.cancel = function(){
			$route.reload();
		}
	});