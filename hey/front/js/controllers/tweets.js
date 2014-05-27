angular.module('hey')
.controller('tweetsController', function ($scope, data) {
  $scope.tweets = data.tweets;
});
