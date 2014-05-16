//This page drive all the loggin system
angular.module('app_synth')
.controller('loginCtrl', function ($scope, $location, $http) {
	$http.get('/api/login/IsLogged').then( function (res){
		if(res.data == "true"){
			$location.path('/people'); 
			isLogged = true;
		}
	});
	$scope.title = "Login";
	$scope.hide_alert = true;

	//Hide the error display
	$scope.log = function (){
		$scope.hide_alert = true;
		if ($scope.pwd == undefined 
			|| $scope.username == undefined
			|| ($scope.username).trim() == "" 
			|| ($scope.pwd).trim() == ""){
			$scope.result = "Enter your username and your password";
			$scope.hide_alert = false;
		}else{
			$http.post('/api/login/LogfirstCo',({username: $scope.username, pwd: $scope.pwd})).then(function (res){
				var check_co = res.data;
				if (check_co == "true"){
					isLogged = true;					
					$location.path('/people');
				}else{
					$scope.result = "Wrong unsername or password";
					$scope.hide_alert = false;
					$scope.username ="";
					$scope.pwd="";
				}
			});

			//
			/*var check_log_ok;

			$http.post('/api/login/LogFirstCo', {username: $scope.username, pwd: $scope.pwd})
			.then(function (res){
				console.log(res);
			});*/
			
		}
	}
})
.controller('headerCtrl', function ($scope,$http,$location){
	$http.get('/api/login/IsLogged').then( function (res){
		if(res.data == "false" || res.data == undefined)
			$location.path('/');
	});
})
.controller('footerCtrl', function ($scope, $http, $location){
	$scope.hide_logout = true;
	console.log('hei');
	$http.get('/api/login/IsLogged').then( function (res){
		if(res.data == "true"){
			$scope.hide_logout = false;
			$scope.logout = function(){
				$scope.hide_logout = true;
				isLogged = false;
				$http.post('/api/login/Logout');
				$location.path('/');
			}
	}
	});
});
