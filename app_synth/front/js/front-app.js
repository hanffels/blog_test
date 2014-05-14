var dataLoaderRunner = [
  'dataLoader',
  function (dataLoader) {
    return dataLoader();
  }
];
angular.module('app_synth', ['ngRoute','ui.router'])
  .config(function ($routeProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/tweets');

    $stateProvider
      .state('tweets', {
        url: '/tweets'
      })
      .state('contact', {
        url:'/contact'
      });
    $routeProvider
    .when('/tweets', {
      templateUrl: '/html/tweets/getIndex.html',
      controller: 'tweetsController',
      resolve: {
        data: dataLoaderRunner
      }
    })
    .when('/contact', {
      templateUrl: 'html/contact.html',
      controller: 'contactCtrl'
    });

    $locationProvider.html5Mode(true);
  })

.service('dataLoader', function ($location, $http) {
  return function () {
    if (preloadedData) {
      var data = preloadedData;
      preloadedData = null;
      return data;
    } else {
      return $http.get( '/api' + $location.path() ).then(function (res) {
        return res.data;
      });
    }
  };
});
