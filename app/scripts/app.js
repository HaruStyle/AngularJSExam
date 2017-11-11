'use strict';

/**
 * @ngdoc overview
 * @name angularJsexamApp
 * @description
 * # angularJsexamApp
 *
 * Main module of the application.
 */
angular
  .module('angularJsexamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $routeProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('main', {
        url:'/',
        templateUrl:'views/main.html',
        controller:'MainCtrl'
      })
      .state('rank-detail',{
        url:'/rank/detail',
        templateUrl:'views/rank-detail.html',
        controller:'RankDetailCtrl',
        params:{
            seq:null, ori_seq:null, contxt:null
        }
      })

      .state('login', {
        url:'/login',
        templateUrl:'views/login.html',
        controller:'LoginCtrl'
      })
      .state('choice',{
        url:'/choice',
        templateUrl:'views/choice.html',
        controller:'ChoiceCtrl',
        params:{
          kind:null
      }
      })
      .state('signup',{
        url:'/signup',
        templateUrl:'views/signup.html',
        controller:'SignupCtrl'
      })
      // .state('user-list',{
      //   url:'/user/list',
      //   templateUrl:'views/user-list.html',
      //   controller:'UserListCtrl'
      // })
      // .state('user-detail',{
      //   url:'/user/detail',
      //   templateUrl:'views/user-detail.html',
      //   controller:'UserDetailCtrl'
      // })
      .state('user-withdraw',{
        url:'/user/withdraw',
        templateUrl:'views/user-withdraw.html',
        controller:'UserWithdrawCtrl'
      })
    /*$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });*/
  });
