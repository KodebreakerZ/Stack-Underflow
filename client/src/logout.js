'use strict';
//depending on makerpass format, this page may not be needed
angular.module('myApp')
<<<<<<< HEAD
  .controller('LogoutCtrl', ['$scope', '$window', '$state', '$cookieStore', function($scope, $window, $state, $cookieStore, LogoutCtrl) {
  	$window.localStorage.removeItem('com.underflow');
  	$cookieStore.remove('qid');
  	$cookieStore.remove('uid');
=======
  .controller('LogoutCtrl', ['$scope', '$window', '$state', function($scope, $window, $state) {
  	$window.localStorage.removeItem('com.underflow');
>>>>>>> b642c6b1719c79be15b64fdb7c2c79ad4a949cb2
  	$state.go('login');
  }]);
