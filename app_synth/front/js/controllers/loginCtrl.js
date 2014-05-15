angular.module('app_synth')
.controller('loginCtrl', function ($scope, $location, $http) {
	$scope.title = "Login";

	//Hide the error display
	$scope.hide_alert = true;

	$scope.log = function (){
		if ($scope.pwd == undefined 
			|| $scope.username == undefined
			|| ($scope.username).trim() == "" 
			|| ($scope.pwd).trim() == ""){
			$scope.result = "Enter your username and your password";
			$scope.hide_alert = false;
		}else{
			/*var check_log_ok;

			$http.post('/api/login/LogFirstCo', {username: $scope.username, pwd: $scope.pwd})
			.then(function (res){
				console.log(res);
			});*/
			
		}
	}
});
