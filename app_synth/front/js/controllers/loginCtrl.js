//This page drive all the loggin system
angular.module('app_synth')
.controller('loginCtrl', function ($scope, $state, $http) {
	$http.get('/api/login/IsLogged').then( function (res){
		if(res.data.isLogged == true){
			$state.go('article'); 
			login.isLogged = true;
			login.role = res.data.role;
		}
	});
	$scope.title = "Login";
	$scope.hide_alert = true;

	$scope.log_unreg = function (){
		$state.go('article');
	}
	$scope.sign_up = function (){
		$state.go('sign_up');
	}
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
				if (check_co.isLogged == true){
					login.isLogged = true;
					login.role = check_co.role;	
					$state.go('article'); 
				}else{
					$scope.result = "Wrong unsername or password";
					$scope.hide_alert = false;
					$scope.username="";
					$scope.pwd="";
				}
			});			
		}
	}
})
.controller('headerCtrl', function ($scope,$http,$location){
	$scope.guest_hide = true;
	$scope.admin_hide = true;
	if(login.isLogged == undefined || login.isLogged == false)
		$scope.guest_hide = true;
	else
		$scope.guest_hide = false;

	if (login.role == "1" && login.isLogged != false){
		$scope.admin_hide = false;
	}
	else
		$scope.admin_hide = true;

	//console.log($scope.admin_hide+" - "+$scope.guest_hide);
	//console.log(login.isLogged == undefined);
	$http.get('/api/login/IsLogged').then( function (res){
		if(res.data == "false" || res.data == undefined)
			$location.path('/');
	});
})
.controller('logoutCtrl', function ($scope, $http, $location){
	$scope.hide_logout = true;
	$http.get('/api/login/IsLogged').then( function (res){
		if(res.data.isLogged == true){
			$scope.hide_logout = false;
			$scope.logout = function(){
				$scope.hide_logout = true;
				login.isLogged = false;
				$http.post('/api/login/Logout');
				$location.path('/');
			}
	}
	});
})
.controller('sign_upCtrl', function ($scope, $http, $location,data_users,data_sign){
	$scope.title = 'Create an account';
	$scope.hide_alert_error = true;
	$scope.hide_alert_success = true;

	$scope.hide_alert_mail = true;
	$scope.hide_alert_username = true;
	$scope.hide_alert_pwd = true;
	$scope.hide_alert_pwd_confirm = true;

	$scope.check_username = function (){
		$scope.hide_alert_username = true;
		var re = /^\w+$/;
	    if(!re.test($scope.username)) {
	      $scope.hide_alert_username = false;
	      return false;
	    }

		for (var i = 0; i < data_users.length; i++) {
			if(data_users[i].username == $scope.username){
				$scope.hide_alert_username = false;
				return false;
			}
		}
		for (var i = 0; i < data_sign.length; i++) {
			if(data_sign[i].username == $scope.username){
				$scope.hide_alert_username = false;
				return false;
			}

		};
	}
	$scope.check_mail = function (){
		$scope.hide_alert_mail = true;
		var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
		if(!reg.test($scope.mail)){
			$scope.hide_alert_mail = false;
		}
	}
	$scope.check_pwd = function (){
		$scope.hide_alert_pwd = true;

		var pwd = $scope.pwd;
		if(pwd.length < 8){
			$scope.hide_alert_pwd = false;
		}
		if(pwd == $scope.username){
			alert('Password must be different from Username');
			$scope.hide_alert_pwd = false;
		}
		var reg = /[0-9]/;
		if(!reg.test(pwd)){
			$scope.hide_alert_pwd = false;
		}
		var reg = /[A-Z]/;
		if(!reg.test(pwd)){
			$scope.hide_alert_pwd = false;
		}
		var reg = /[a-z]/;
		if(!reg.test(pwd)){
			$scope.hide_alert_pwd = false;
		}
	}
	$scope.check_pwd_confirm = function (){
		$scope.hide_alert_pwd_confirm = true;
		if ($scope.pwd != $scope.confirm_pwd){
			$scope.hide_alert_pwd_confirm = false;
		}
	}
	$scope.valid = function (){
		//Run again all the checks to avoid cheaters :P
		$scope.check_pwd_confirm();
		$scope.check_pwd();
		$scope.check_username();

		if ($scope.hide_alert_pwd_confirm
			&& $scope.hide_alert_pwd
			&& $scope.hide_alert_username
			&& $scope.username != undefined && $scope.username.trim() != ""
			&& $scope.last_name != undefined && $scope.last_name.trim() != ""
			&& $scope.first_name != undefined && $scope.first_name.trim() != ""
			&& $scope.pwd.trim() != ""){
			
			var new_user = {};
			new_user.username = $scope.username;
			new_user.firstname = $scope.first_name;
			new_user.name = $scope.last_name;
			new_user.pwd = $scope.pwd;
			new_user.mail = $scope.mail;

			$http.post('/api/sign_up/AddOne', {content: new_user})
			$scope.hide_alert_success = false;
			$scope.result = "Your account is created, wait for the validation of the admin";
			$scope.username = "";
			$scope.first_name = "";
			$scope.last_name = "";
			$scope.pwd = "";
			$scope.confirm_pwd = "";
			$scope.mail = "";

		}else{
			$scope.hide_alert_error = false;
			$scope.result = "Please fill all the forms correctly !";
		}
	}
});
