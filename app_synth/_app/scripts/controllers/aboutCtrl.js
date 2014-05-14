'use strict';

angular.module('myApp')
  .controller('aboutCtrl', ['$scope', function ($scope) {
		$scope.title = 'About';
		$scope.items = ['Pat1','Pat2','Pat3'];
	}]);
