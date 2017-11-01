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

    $scope.name = "";
    $scope.age = "";
    $scope.saveUserInfo = function() {
    	var dataPromise = Data.setData(
        //'http://172.16.2.18:52273/user',
        'http://192.168.42.80:52273/user',
    		'&name='+$scope.name+'&age='+$scope.age);
    	dataPromise.then(function(restuls){
    		$scope.name = "";
    		$scope.age = "";
    	},function(reason){},function(update){});
    };

  }]);