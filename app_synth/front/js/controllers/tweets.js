angular.module('app_synth')
.controller('tweetsController', function ($scope, data) {
  $scope.tweets = data.tweets;
});
