angular.module('app_synth')
.controller('userCtrl', function ($scope, $http, $route){
	$scope.admin_hide = true;
	if (login.role == "1"){
		$scope.admin_hide = false;

		$http.get('/api/contact').then(function (res){
			if(res.data == undefined || res.data.length == 0)
				$scope.admin_hide = true;
			else
				$scope.contact = res.data;
		});
	}

	$scope.hide_alert_error=true;
	$scope.hide_alert_success=true;

	var role_id;

	$http.get('/api/login/OneUser').then(function (res){
		user = res.data

		console.log(user);

		$scope.confirm = true;

		$scope.username = user.username;
		$scope.name = user.name;
		$scope.firstname = user.firstname;
		$scope.pwd = user.pwd;
		$scope.pwd_conf = user.pwd;
		$http.get('/api/roles').then(function (res){
			var role =  res.data;
			var role_name;

			for (var i = role.length - 1; i >= 0; i--) {
				if(role[i].id == user.role){
					role_name = role[i].name; 
					role_id = role[i].id;
				}
			};

			$scope.role = role_name;
		});
	});

	$scope.save = function (){
		if($scope.pwd != $scope.pwd_conf){
			$scope.hide_alert_error = false;
			$scope.result= "Your passwords are incorrect";
		}
		else{
			var user = {};
			user.username = $scope.username;
			user.name = $scope.name;
			user.firstname = $scope.firstname;
			user.pwd = $scope.pwd;
			user.role =role_id;

			$http.post('/api/login/ModifyUser', {content: user});
			$scope.hide_alert_success = false;
			$scope.result= "Changes have been made";
		}
	}

	$scope.save_contact = function(){
		$http.post('/api/contact', {content: $scope.contact});
		$scope.hide_alert_success = false;
		$scope.result= "Done ! ";
	}
});