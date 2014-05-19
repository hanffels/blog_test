angular
	.module('app_synth')
	.controller('postCtrl', function ($scope, $http,$route,  $location, data_articles, data_users,data_roles){
		if(login.isLogged == false || login.isLogged == undefined)
			$location.path('/');

		$scope.hide_alert= true;
		$scope.title = 'Administration';

		//Init properties 
		var articles_admin = {
			data: data_articles,
			title : 'Articles',
			api : 'article',
			properties : ['id','title','content','image','date_hour','user']
		}
		var users_admin = {
			data: data_users,
			title : 'Members',
			api : 'login',
			properties : ['id','username','role','name','firstname','pwd']
		}
		var roles_admin = {
			data: data_roles,
			title : 'Roles',
			api : 'roles',
			properties : ['id','name']
		}

		$scope.panels = [articles_admin,users_admin,roles_admin];

		$scope.save = function(api_name, contents){
			$http.post('/api/'+api_name, {content: contents});
			$scope.result = "Done";
			$scope.hide_alert = false;
		}
		$scope.cancel = function(){
			$route.reload();
		}
	})

	.controller('adminCtrl', function ($scope){
		$scope.init = function(data){
			$scope.items = data.data;
			$scope.title = data.title;
			$scope.api = data.api;
			$scope.properties = data.properties;
		};
	});