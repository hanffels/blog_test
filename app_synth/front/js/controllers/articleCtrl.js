angular.module('app_synth')
.controller('articleCtrl', function ($scope,$location, $http, $modal) {
	if(login.isLogged == false || login.isLogged == undefined)
		$location.path('/');

	$http.get('/api/article/Checked').then(function (res){
		var data = res.data;
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
			//console.log(data);
			$scope.articles = data;
			$scope.title = "Articles";
		});
	});

	$http.get('/api/categories').then(function (res) {
		$scope.searchCat = {};
		$scope.categories = res.data;
	});

	$scope.readmore = function (index) {

	    var modalInstance = $modal.open({
	      templateUrl: '/html/article/popup_article.html',
	      controller: 'articlePopupCtrl',
	      size: 'lg',
	      resolve: {
	        article: function () {
	          return $scope.articles[index];
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    });
	};

})
.controller('articlePopupCtrl', function ($scope, $modalInstance, $http, article) {
  $scope.new_comment = {};
  $scope.article = article;
  $scope.comments = false;
  $scope.admin_hide = true;

  $scope.close = function () {
    $modalInstance.close();
  };

  $scope.comment = function () {
    $scope.commenting = true;
    $http.get('/api/comment?id_article='+$scope.article.id,{id_article: $scope.article.id}).then(function (res){
    	if (res.data.length == 0){
    		$scope.no_comment = 'No comments yet...';
    	}else
    		$scope.comments = res.data;
    });

    if (login.role == "1"){
		$scope.admin_hide = false;

		$scope.removeComment = function(index){
			$http.post('/api/comment/RemoveOne',{content: $scope.comments[index]});
			$scope.comments.splice(index,1);
		}
	}
  };

  $scope.addComment = function(){
  	if($scope.new_comment.add.trim() != ""){
	  	$http.post('/api/comment/AddComment',{article: article, comment_text: $scope.new_comment.add});
	  	$http.get('/api/comment?id_article='+$scope.article.id,{id_article: $scope.article.id}).then(function (res){
	    	if (res.data.length == 0){
	    		$scope.no_comment = 'No comments yet...';
	    	}else{
	    		$scope.comments = res.data;
	    		$scope.no_comment = "";
	    	}
	    });
	}	
	else
		alert('Enter something to comment');
	$scope.new_comment.add = "";
  }
})

.controller('addArticleCtrl', function ($scope, $location,$http) {
	if(login.isLogged == false || login.isLogged == undefined)
		$location.path('/');
	
	$scope.title = "Publish an article";
	$scope.success = true;

	$scope.publish = function(){
		var article = {};

		article.title = $scope.title_article;
		article.content = $scope.content_article;
		article.image = $scope.url_article;
		article.status = 0;

		$scope.title_article = "";
		$scope.content_article = "";
		$scope.url_article = "";
		$http.post('/api/article/AddOneArticle', {content: article});
		
		$scope.success = false;
	}
});
