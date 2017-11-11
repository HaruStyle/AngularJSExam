'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .factory('Data',['$http','$q', 
  	function($http, $q) {
  		return {
  			getData : function(url) {
  				var defered = $q.defer();
  				$http({
  					method:'GET', url:url,
  					headers:{
  						'Content-Type':
  						'application/text;charset=utf-8'
  					}
  				}).then(function(response){
  					defered.resolve(response);
  				}, function(response) {
  					window.alert(JSON.stringify(response));
  				});
  				return defered.promise;
  			},
  			setData : function(url, data) {
  				var defered = $q.defer();
  				$http({
  					method:'POST', url:url, data:data,
  					headers:{
  						'Content-Type':
  						'application/x-www-form-urlencoded'
  					}
  				}).then(function(response){
  					defered.resolve(response);
  				}, function(response){
  					defered.resolve(response);
  				});
  				return defered.promise;
  			},
  			modifyData : function(url, data) {
  				var defered = $q.defer();
  				$http({
  					method:'PUT', url:url, data:data,
  					headers:{
  						'Content-Type':
  						'application/x-www-form-urlencoded'
  					}
  				}).then(function(response){
  					defered.resolve(response);
  				}, function(response){
  					defered.resolve(response);
  				});
  				return defered.promise;
  			},
  			deleteData : function(url, data) {
  				var defered = $q.defer();
  				$http({
  					method:'DELETE', url:url, data:data,
  					headers:{
  						'Content-Type':
  						'application/x-www-form-urlencoded'
  					}
  				}).then(function(response){
  					defered.resolve(response);
  				}, function(response){
  					defered.resolve(response);
  				});
  				return defered.promise;
  			}
  		}
  	}])
  .controller('MainCtrl', [
	"Data", "$scope", "$state", 'sessionInfo',
	function (Data, $scope, $state, sessionInfo) {
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
    $scope.$on('$viewContentLoaded', function() {
    //   var os = $location.search().os;
    //   if (os != undefined) {
    //     window.alert(os);
	//   }
	  $scope.requestRankList();
	});
	$scope.rankList = [];
    $scope.requestRankList = function() {
    	var dataPromise = Data.getData(
			'http://172.16.2.18:52273/rank');
			//'http://192.168.43.239:52273/rank');
    	dataPromise.then(function(results) {
    		$scope.rankList = results.data;
    	},function(reason){},function(update){});
	};
    $scope.seq = "";
	$scope.replyPage = function(seq){
		$state.go('rank-detail',{seq:seq});
	};
	$scope.selectedObj = {};
	// 추천
	$scope.ori_seq2 = 0;
	$scope.goodAdd = function(ori_seq2) {
		//window.alert(ori_seq2);
		$scope.ori_seq2 = ori_seq2;
		  var dataPromise = Data.modifyData(
		  'http://172.16.2.18:52273/goodadd/'+ori_seq2);
		 // 'http://192.168.43.239:52273/rank/save/', 
		  dataPromise.then(function(results) {
		  $scope.requestRankList();
		 
		  },function(r){},function(u){});
	  }

  }]);