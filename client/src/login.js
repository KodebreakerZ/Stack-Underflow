//'use strict';
//this is being called by the login button on the login page
//this calls the factory function Login.verify below 
//then sets the result in localStorage
angular.module('myApp.auth', [])
  .controller('AuthController', function ($scope, $window, $state, $cookieStore, Auth) {
    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.underflow', token);
          $state.go('home');
        })
        .catch(function(error) {
          console.log('Something went wrong', error);
          $state.reload();
        })
    };

    $scope.signup = function() {
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.underflow', token);
          $state.go('home');
        })
        .catch(function(error) {
          console.log('Something went wrong', error);
        });
    };
  })

  .factory('Auth', function ($http, $location, $window, $cookieStore) {
    var signin = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signin',
        data: user
      })
      .then(function(resp) {
        if (resp.data.error) {
          alert(resp.data.error);
          throw new Error(resp.data.error);
        }
        console.log("Is this my person???", resp);
        $cookieStore.put('uid', resp.data.uid);
        return resp.data.token;
      });
    };

    var signup = function(user) {
      return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then (function (resp) {
        console.log("What is this??!?!?!", resp);
        $cookieStore.put('uid', resp.data.uid);
        return resp.data.token;
      });
    };

    var isAuth = function () {
      return !!$window.localStorage.getItem('com.underflow');
    };

    var signout = function() {
      $window.localStorage.removeItem('com.underflow');
      $state.go('login');
    };

    return {
      signin: signin,
      signup: signup,
      isAuth: isAuth,
      signout: signout
    };
  })
