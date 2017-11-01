'use strict';

/**
 * @ngdoc service
 * @name angularJsexamApp.sessionService
 * @description
 * # sessionService
 * Service in the angularJsexamApp.
 */
angular.module('angularJsexamApp')
  .service('sessionService', 
  	[ 'Data','sessionInfo',  function (Data, sessionInfo) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.login = function(params, callback) {
    	var dataPromise = Data.setData(
    		'http://172.16.2.18:52273/user/login',
    		//'http://10.0.2.2:52273/user/login',
    		'&user_id='+params.user_id+"&password="+params.password);
    	dataPromise.then(function(result) {
    		if (result.data.result == true) {
    			result = JSON.stringify(result);
    			result = JSON.parse(result);
    			result.data.user_id = params.user_id;
    			sessionInfo.reset();
    			sessionInfo.setUserInfo(result);
    			callback(result);
    		} else {
    			window.alert('로그인 실패');
    		}
    	}, function(reason) {}, function(update) {});
    }
  }]);