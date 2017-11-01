'use strict';

/**
 * @ngdoc service
 * @name angularJsexamApp.sessionInfo
 * @description
 * # sessionInfo
 * Service in the angularJsexamApp.
 */
angular.module('angularJsexamApp')
  .service('sessionInfo', 
  	[ '$rootScope', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.localStorageKey = "__SESSION_INFO";
    try {
    	$rootScope.currentUser = 
    		JSON.parse(localStorage.getItem(this.localStorageKey) 
    			|| "{}")
    } catch(e) { $rootScope.currentUser = {}; }
    this.getCurrentUser = function() {
    	return $rootScope.currentUser;
    };
    this.isUserSignedIn = function() {
    	if (this.getCurrentUser()) {
    		if (this.getCurrentUser().data != undefined) {
    			return true;
    		} else { return false; }
    	} else { return false; }
    };
    this.setUserInfo = function(info) {
    	angular.extend($rootScope.currentUser, info);
    	localStorage.setItem(this.localStorageKey,
    		JSON.stringify($rootScope.currentUser));
    }
    this.reset = function() {
    	$rootScope.currentUser = {};
    	localStorage.setItem(this.localStorageKey,
    		JSON.stringify($rootScope.currentUser));
    }
  }]);