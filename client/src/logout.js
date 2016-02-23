'use strict';
//depending on makerpass format, this page may not be needed
angular.module('myApp')
  .controller('LogoutCtrl', ['$scope', '$window', '$state', '$cookieStore', function($scope, $window, $state, $cookieStore) {
  	$window.localStorage.removeItem('com.underflow');
  	$cookieStore.remove('qid');
  	$cookieStore.remove('uid');
  	$state.go('login');
  }]);
