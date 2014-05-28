angular
	.module('app_synth')
	.controller('adminGlobalCtrl', function ($scope, $http, $route,  $location, data_categories, data_articles, data_users,data_roles,data_comment,data_contact,data_sign){
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
			properties : ['id','username','mail','role','name','firstname','pwd']
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
			properties : ['id','id_article','user','date','content']
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
		var sign_admin = {
			data: data_sign,
			title : 'Signing up',
			api : 'sign_up',
			properties : ['id','username','mail','role','name','firstname','pwd']
		}

		$scope.panels = [articles_admin,users_admin,roles_admin,comment_admin,contact_admin,categories_admin,sign_admin];

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
		$scope.hide_alert_success_use=true;
		$scope.loading_art = false;
		$scope.loading_contact = false;

		$http.get('/api/article/Unchecked').then(function (res){
			if(res.data == undefined || res.data.length == 0){
				$scope.admin_hide = true;
				$scope.loading_art = true;
			}else{
				$scope.articles = res.data;
				$scope.loading_art = true;
			}
		});


		$http.get('/api/contact').then(function (res){
			if(res.data == undefined || res.data.length == 0){
				$scope.admin_hide = true;
				$scope.loading_contact = true;
			}else{
				$scope.contact = res.data;
				$scope.loading_contact = true;
			}
		});

		$http.get('/api/sign_up').then(function (res){
			if(res.data == undefined || res.data.length == 0){
				$scope.admin_hide = true;
				$scope.loading_sign = true;
			}else{
				$scope.users_sign = res.data;
				$scope.loading_sign = true;
			}
		});

		$http.get('/api/roles').then(function (res){
			if(res.data == undefined || res.data.length == 0)
				$scope.admin_hide = true;
			else{
				console.log(res.data);
				$scope.roles = res.data;
			}
		});

		$scope.save_rol = function (){
			var users = $scope.users_sign;
			var check = true;
			for (var i = 0; i < users.length; i++) {
				if(users[i].role == undefined || users[i].role == "")
					check=false
			};
			if(!check){
				alert('Please set all the roles');
			}else {
				$http.post('/api/login/AddSome', {content: $scope.users_sign});
				$scope.hide_alert_success_use = false;
				$scope.result_users= "Done ! ";
			}
		}

		$scope.save_contact = function(){
			$http.post('/api/contact', {content: $scope.contact});
			$scope.hide_alert_success_com = false;
			$scope.result_contacts= "Done ! ";
		}

		$scope.save_art = function(){
			console.log($scope.articles);
			$http.post('/api/article/Moderation', {content: $scope.articles});
			$scope.hide_alert_success_art = false;
			$scope.result_articles= "Done ! ";
		}
	});