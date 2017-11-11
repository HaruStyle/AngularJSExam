'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:ChoiceCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularJsexamApp
 */ 
angular.module('angularJsexamApp')
  .controller('ChoiceCtrl',[
	"Data", "$scope", "$state", 'sessionInfo',
	function (Data, $scope, $state, sessionInfo) {
    this.awesomeThings = [
	  'HTML5 Boilerplate',
      'AngularJS',
	  'Karma'
    ];
    if (sessionInfo.isUserSignedIn()) {
    	$state.go('choice');
    } else {
    	$state.go('login');
    }
    $scope.kind = "";
    $scope.choiceList = [];
    $scope.choicePage = function(kind) {
     // window.alert(kind);
      $scope.selectedObj = {};
      $scope.kind = kind;
    	var dataPromise = Data.getData(
      'http://172.16.2.18:52273/kind/'+kind);
		//	'http://192.168.43.239:52273/kind/'+kind);
    	dataPromise.then(function(results) {
    		$scope.choiceList = results.data;
      },function(reason){},function(update){});
    };
    $scope.choiceKList = [
        { seq: 0 , kind:'r',kind_no:99, name:'안먹어', detail:'미선택', price:0},
        { seq: 0 , kind:'w',kind_no:99, name:'안먹어', detail:'미선택', price:0},
        { seq: 0 , kind:'c',kind_no:99, name:'안먹어', detail:'미선택', price:0},
        { seq: 0 , kind:'b',kind_no:99, name:'안먹어', detail:'미선택', price:0},
        { seq: 0 , kind:'',kind_no:'', name:'', detail:'', price:0}
    ];

      $scope.choiceKind = function() {

        if ($scope.selectedObj.kind == "r") {
          $scope.choiceKList[0] = $scope.selectedObj;
          $scope.selectedObj = {};
         // window.alert($scope.choiceKList[0].kind+" : "+$scope.choiceKList[0].name);
        }else if ($scope.selectedObj.kind == "w"){
          $scope.choiceKList[1] = $scope.selectedObj;
          $scope.selectedObj = {};
         // window.alert($scope.choiceKList[1].kind+" : "+$scope.choiceKList[1].name);
        }else if ($scope.selectedObj.kind == "c"){
          $scope.choiceKList[2] = $scope.selectedObj;
          $scope.selectedObj = {};
        }else if ($scope.selectedObj.kind == "b"){
          $scope.choiceKList[3] = $scope.selectedObj;
          $scope.selectedObj = {};
        };

      };
      $scope.r = '';
      $scope.w = '';
      $scope.c = '';
      $scope.b = '';
      $scope.chioceAll = [];
      $scope.totalSum = 0;
      
      $scope.setTotals = function(item){
          if (item){
              $scope.totalSum += parseInt(item.price);
          }
      }
      
      $scope.saveChoice = function(chioceAll) {
        //window.alert(JSON.stringify(chioceAll));
        $scope.chioceAll = chioceAll;
        $scope.r = $scope.chioceAll[0].kind_no;
        $scope.w = $scope.chioceAll[1].kind_no;
        $scope.c = $scope.chioceAll[2].kind_no;
        $scope.b = $scope.chioceAll[3].kind_no;
        //window.alert('&r='+$scope.r+'&w='+$scope.w+'&c='+$scope.c+'&b='+$scope.b);
        var dataPromise = Data.setData(
          'http://172.16.2.18:52273/savechoice/',
          '&r='+$scope.r+'&w='+$scope.w+'&c='+$scope.c+'&b='+$scope.b); 
        dataPromise.then(function(results) {
          $scope.r = '';
          $scope.w = '';
          $scope.c = '';
          $scope.b = '';
          window.alert("랭킹등록이 완료 되었습니다.");
          $state.go('main');
        },function(r){},function(u){});
      }

}]);
