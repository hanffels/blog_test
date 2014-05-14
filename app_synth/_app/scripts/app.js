'use strict';

angular
  .module('myApp', [
    'ui.router'
  ])
  .config(['$urlRouterProvider', '$stateProvider' ,function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
        resolve : {
          people: ['$http', function ($http) {
            return $http.get('files/test.json').then(function(response){
              return response.data;
            });
          }]
        }
      })
      .state('about', {
        url:'/about',
        templateUrl: 'templates/home.html',
        controller: 'aboutCtrl'
      })
      .state('contact', {
        url:'/contact',
        templateUrl: 'templates/contact.html'
      })
      .state('admin', {
        url:'/admin',
        templateUrl: 'templates/admin.html',
        controller: 'adminCtrl',
        resolve : {
          people: ['$http', function ($http) {
            return $http.get('files/test.json').then(function(response){
              return response.data;
            });
          }]
        }
      });
  }]);
