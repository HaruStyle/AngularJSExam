'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:UserWithdrawCtrl
 * @description
 * # UserWithdrawCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('UserWithdrawCtrl',[
    "Data", "$scope", "$state", 'sessionInfo',
    function (Data, $scope, $state, sessionInfo) {
      this.awesomeThings = [
      'HTML5 Boilerplate',
        'AngularJS',
      'Karma'
      ];
  if (sessionInfo.isUserSignedIn()) {
    
  } else {
    $state.go('login');
  }
      
    $scope.gohome = function(){
      $state.go('main');
    };

    
}]);