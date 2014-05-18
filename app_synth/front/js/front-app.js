var dataLoaderRunnerArticle = ['dataLoaderArticle', function (dataLoaderArticle) {
    return dataLoaderArticle();
  }
];

var dataLoaderRunnerUsers = ['dataLoaderUsers', function (dataLoaderUsers) {
    return dataLoaderUsers();
  }
];

var dataLoaderRunnerRoles = ['dataLoaderRoles', function (dataLoaderRoles) {
    return dataLoaderRoles();
  }
];

var login={};

angular.module('app_synth', ['ngRoute','ui.router','ui.bootstrap'])
  .config(function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('article', {
        url: '/article'
      })
      .state('user', {
        url: '/user'
      })
      .state('contact', {
        url:'/contact'
      })
      .state('admin', {
        url:'/admin'
      });

    $routeProvider
    .when('/', {
      templateUrl: '/html/login/login.html',
      controller: 'loginCtrl'
    })
    .when('/user', {
      templateUrl: '/html/login/user.html',
      controller: 'userCtrl',
    })
    .when('/article', {
      templateUrl: '/html/article/getIndex.html',
      controller: 'articleCtrl',
      resolve: {
        data: dataLoaderRunnerArticle
      }
    })
    .when('/contact', {
      templateUrl: 'html/contact.html',
      controller: 'contactCtrl'
    })
    .when('/admin', {
      templateUrl: 'html/article/post.html',
      controller: 'postCtrl',
      resolve: {
        data_articles: dataLoaderRunnerArticle,
        data_users: dataLoaderRunnerUsers,
        data_roles: dataLoaderRunnerRoles
      }
    })
    .otherwise('/');
    
    $locationProvider.html5Mode(true);
  })

.service('dataLoaderArticle', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/article' ).then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderUsers', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/login' ).then(function (res) {
        return res.data;
      });
    }
  };
})
.service('dataLoaderRoles', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/roles' ).then(function (res) {
        return res.data;
      });
    }
  };
});