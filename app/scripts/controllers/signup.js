'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('SignupCtrl', [
  "Data", "$scope", "$state",
   function (Data, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user_id = "";
    $scope.password = "";
    $scope.name = "";
    $scope.age = "";
    $scope.saveUserInfo = function() {
    	var dataPromise = Data.setData(
        'http://172.16.2.18:52273/user',
        //'http://192.168.43.239:52273/user',
    		'&user_id='+$scope.user_id+'&password='+$scope.password+'&name='+$scope.name+'&age='+$scope.age);
    	dataPromise.then(function(restuls){
        $scope.user_id = "";
        $scope.password = "";
    		$scope.name = "";
        $scope.age = "";
        window.alert("회원가입 완료!! 로그인 해주세요~");
        $state.go('login');
    	},function(reason){},function(update){});
    };

  }]);