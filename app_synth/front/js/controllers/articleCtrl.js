angular.module('app_synth')
.controller('articleCtrl', function ($scope,$location,  data) {
	if(login.isLogged == false || login.isLogged == undefined)
		$location.path('/');
	
	$scope.article = data;
	$scope.title = "Article";
});
