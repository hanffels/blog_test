var dataLoaderRunnerPeople = ['dataLoaderPeople', function (dataLoaderPeople) {
    return dataLoaderPeople();
  }
];
var isLogged=false;

angular.module('app_synth', ['ngRoute','ui.router'])
  .config(function ($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('people', {
        url: '/people'
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
    .when('/people', {
      templateUrl: '/html/people/getIndex.html',
      controller: 'peopleController',
      resolve: {
        data: dataLoaderRunnerPeople
      }
    })
    .when('/contact', {
      templateUrl: 'html/contact.html',
      controller: 'contactCtrl'
    })
    .when('/admin', {
      templateUrl: 'html/people/post.html',
      controller: 'postCtrl',
      resolve: {
        data: dataLoaderRunnerPeople
      }
    })
    .otherwise('/');
    $locationProvider.html5Mode(true);
  })

.service('dataLoaderPeople', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api/people' ).then(function (res) {
        return res.data;
      });
    }
  };
});