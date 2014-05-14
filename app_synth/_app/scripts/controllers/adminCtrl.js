'use strict';

angular
	.module('myApp')
	.controller('adminCtrl', ['$scope', 'people', function($scope,people){
          $scope.title = 'Administration';
          $scope.items = people.persons;
          $scope.save = function(){
            //var fs = require('fs');
            window.alert(JSON.stringify($scope.items));
            //fs.writeFileSync('files/test.json', JSON.stringify($scope.items), 'UTF-8');
          };
        }]);