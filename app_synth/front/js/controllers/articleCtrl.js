angular.module('app_synth')
.controller('articleCtrl', function ($scope,$location, $http, data) {
	if(login.isLogged == false || login.isLogged == undefined)
		$location.path('/');

	var titles = [];
	var images = [];

	var slides = $scope.slides = [];
	for (var i = 0; i < data.length; i++) {
		slides.push({
			title: data[i].title,
			text: data[i].content.substr(0,50).replace(/$/,"..."),
			image : data[i].image
		});
	};
	$http.get('/api/login').then(function (res){
		users = res.data;

		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < users.length; j++) {
				if(users[j].id == data[i].user){
					data[i].username = users[j].username;
				}
			};
		};

		$scope.articles = data;
		$scope.title = "Articles";
	});
})
.controller('addArticleCtrl', function ($scope, $location) {
	if(login.isLogged == false || login.isLogged == undefined)
		$location.path('/');
	
	$scope.title = "Articles";
});
