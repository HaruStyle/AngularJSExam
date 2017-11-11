'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('LoginCtrl', 
  	['$scope','$state','sessionInfo','sessionService', 
  	function ($scope, $state, sessionInfo, sessionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if (sessionInfo.isUserSignedIn()) {
    	$state.go('main');
    } else {
    	$state.go('login');
    }
    $scope.submitLogin = function() {
    	sessionService.login($scope.login, function(res) {
        window.alert("★오늘의 이벤트 >> 컵라면투게더 App 시연을 보시고 호응을 해주시면 동일하게 응해드리겠습니다^^" );
    		$state.go('main');
    	});
    }
    $scope.isUserSignedIn = function() {
    	return sessionInfo.isUserSignedIn();
    }
    $scope.getUserId = function() {
    	if (sessionInfo.isUserSignedIn())
    		return sessionInfo.getCurrentUser().data.user_id;
    	else return '';
    }
    $scope.logout = function() {
    	sessionInfo.reset();
    	$state.go('login');
    }
  }]);