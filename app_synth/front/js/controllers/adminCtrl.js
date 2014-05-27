angular
	.module('app_synth')
	.controller('adminGlobalCtrl', function ($scope, $http, $route,  $location, data_categories, data_articles, data_users,data_roles,data_comment,data_contact){
		if(login.isLogged == false || login.isLogged == undefined)
			$location.path('/');

		$scope.hide_alert= true;
		$scope.title = 'Administration';

		//Init properties 
		var articles_admin = {
			data: data_articles,
			title : 'Articles',
			api : 'article',
			properties : ['id','title','content','image','date_hour','user','status','categories']
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
		var comment_admin = {
			data: data_comment,
			title : 'Comments',
			api : 'comment',
			properties : ['id','user','date','content']
		}
		var contact_admin = {
			data: data_contact,
			title : 'Contact',
			api : 'contact',
			properties : ['id','name','mail','text','date_hour']
		}
		var categories_admin = {
			data: data_categories,
			title : 'Categories',
			api : 'categories',
			properties : ['id','name']
		}

		$scope.panels = [articles_admin,users_admin,roles_admin,comment_admin,contact_admin,categories_admin];

		$scope.save = function(api_name, contents){
			$http.post('/api/'+api_name, {content: contents});
			$scope.result = "Done";
			$scope.hide_alert = false;
		}
		$scope.cancel = function(){
			$route.reload();
		}
	})

	.controller('adminPanelsCtrl', function ($scope){
		$scope.init = function(data){
			console.log(data.data);
			$scope.items = data.data;
			$scope.title_cat = data.title;
			$scope.api = data.api;
			$scope.properties = data.properties;
		};
	})

	.controller('moderationCtrl', function ($scope, $http, $location){
		$scope.title = 'Moderation';
		$scope.hide_alert_success_com=true;
		$scope.hide_alert_success_art=true;

		$http.get('/api/article').then(function (res){
			if(res.data == undefined || res.data.length == 0)
				$scope.admin_hide = true;
			else
				$scope.articles = res.data;
		});


		$http.get('/api/contact').then(function (res){
			if(res.data == undefined || res.data.length == 0)
				$scope.admin_hide = true;
			else
				$scope.contact = res.data;
		});

		$scope.save_contact = function(){
			$http.post('/api/contact', {content: $scope.contact});
			$scope.hide_alert_success_com = false;
			$scope.result_contacts= "Done ! ";
		}

		$scope.save_art = function(){
			console.log($scope.articles);
			$http.post('/api/article', {content: $scope.articles});
			$scope.hide_alert_success_art = false;
			$scope.result_articles= "Done ! ";
		}
	});