'use strict';

angular
	.module('myApp')
	.controller('homeCtrl', ['$scope', 'people', function($scope, people){
          $scope.title = 'Home';
          $scope.items = people.persons;
        }]);