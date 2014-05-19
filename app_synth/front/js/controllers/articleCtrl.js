angular.module('app_synth')
.controller('articleCtrl', function ($scope,$location, $http, data) {
	if(login.isLogged == false || login.isLogged == undefined)
		$location.path('/');

	var sort = [];
	for (var i = data.length - 1; i >= 0; i--) {
		sort.push(data[i]);
	};

	data = sort;
	var titles = [];
	var images = [];

	var slides = $scope.slides = [];
	for (var i = 0; i < 3; i++) {
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
.controller('addArticleCtrl', function ($scope, $location,$http) {
	if(login.isLogged == false || login.isLogged == undefined)
		$location.path('/');
	
	$scope.title = "Publish an article";

	$scope.publish = function(){
		var article = {};

		article.title = $scope.title_article;
		article.content = $scope.content_article;
		article.image = $scope.url_article;

		$http.post('/api/article/AddOneArticle', {content: article});
	}
});
