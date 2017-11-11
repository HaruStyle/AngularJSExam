'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:RankDetailCtrl
 * @description
 * # RankDetailCtrl
 * Controller of the angularJsexamApp
 */

angular.module('angularJsexamApp')
  .controller('RankDetailCtrl',
  [ "Data", "$scope", "$state", "$stateParams","sessionInfo", 
  function (Data, $scope, $state, $stateParams,sessionInfo) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  if (sessionInfo.isUserSignedIn()) {

  } else {
    $state.go('login');
  }
    //페이지가 로딩되었을 때 호출
    $scope.$on('$viewContentLoaded', function() {
     // window.alert(JSON.stringify($stateParams));
     
      var detail_seq = JSON.stringify($stateParams.seq);
      $scope.getRankDetail(detail_seq);
    });
    $scope.rankDetail = {};
    $scope.getRankDetail = function(seq) {

    	var dataPromise = Data.getData(
        'http://172.16.2.18:52273/rank/'+seq);
       // 'http://192.168.43.239:52273/rank/'+seq);
    	dataPromise.then(function(results) {
			$scope.rankDetail = results.data;
      },function(r){},function(u){});
      $scope.getRankReply(seq);
    }
    $scope.rankReply = {};
    $scope.getRankReply = function(seq) {
    	var dataPromise = Data.getData(
        'http://172.16.2.18:52273/rank/reply/'+seq);
       //'http://192.168.43.239:52273/rank/reply/'+seq); 
    	dataPromise.then(function(results) {
			$scope.rankReply = results.data;
    	},function(r){},function(u){});
    }
    $scope.ori_seq = "";
    $scope.contxt = "";
    $scope.showModal = function(ori_seq){
      
      $scope.ori_seq = ori_seq;
     // window.alert(ori_seq +' : '+$scope.ori_seq );
    } 
    $scope.saveReply = function(ori_seq,contxt) {
     // window.alert($scope.ori_seq + ";;" + contxt);
      $scope.contxt = contxt;

    	var dataPromise = Data.setData(
        'http://172.16.2.18:52273/rank/save/',
       // 'http://192.168.43.239:52273/rank/save/',
        '&ori_seq='+$scope.ori_seq+'&contxt='+$scope.contxt); 
    	dataPromise.then(function(results) {
        $scope.ori_seq = "";
        $scope.contxt = "";
        //$state.go('main');
        var detail_seq = JSON.stringify($stateParams.seq);
        
        $scope.getRankDetail(detail_seq);
    	},function(r){},function(u){});
    }


  }]);
