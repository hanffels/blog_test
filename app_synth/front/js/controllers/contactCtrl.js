angular.module('app_synth')
.controller('contactCtrl', function ($scope, $location, $http) {
	$scope.success = true;
	$scope.error_text = true;
	$scope.error_name = true;
	$scope.error_mail = true;
	$scope.contact = 'Do you want to contact me ?' ;
	$scope.title = 'Contact'

	$scope.send = function() {
		$scope.error_text = true;
		$scope.error_name = true;
		$scope.error_mail = true;

		if($scope.name == undefined || $scope.name.trim() == ""){
			$scope.error_name =false;
		}else
		if($scope.mail == undefined || $scope.mail.trim() == ""){
			$scope.error_mail = false;
		}else
		if($scope.text_question == undefined || $scope.text_question.trim() == ""){
			$scope.error_text = false;
		}else{
			var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
			if(!reg.test($scope.mail)){
				alert('Enter a correct mail adress');
			}else {
				var new_question = {};
				new_question.name = $scope.name;
				new_question.mail = $scope.mail;
				new_question.text = $scope.text_question;

				$http.post('/api/contact/AddOneQuestion', {content :new_question});
				// Once it's done
			    $scope.success = false;
			    $scope.name = "";
			    $scope.text_question = "";
			    $scope.mail = "";
			}
		}
	}
})
.controller('infoCtrl', function ($scope){
	$scope.title = 'About'
	$scope.about = 'About the web site';
});