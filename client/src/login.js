//'use strict';
//this is being called by the login button on the login page
//this calls the factory function Login.verify below 
//then sets the result in localStorage
angular.module('myApp.auth', [])
<<<<<<< HEAD
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
=======
  .controller('AuthController', function ($scope, $window, $state, Auth) {
    $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        // console.log('tokennnn', token)
        $window.localStorage.setItem('com.underflow', token);
        $state.go('home')
      })
      .catch(function (error) {
        console.error("ERROR", error);
        $state.reload();
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.underflow', token);
        // $location.path('/');
        $state.go('home')
      })
      .catch(function (error) {
        console.error(error);
      });
  };
})
//This authenticates the user by exchanging the user's username and password
//for a JWT from the server.
  .factory('Auth', function ($http, $location, $window) {
      var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      if(resp.data.error) {
        alert(resp.data.error)
        throw new Error(resp.data.error)
      }
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.underflow');
  };

  var signout = function () {
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
>>>>>>> b642c6b1719c79be15b64fdb7c2c79ad4a949cb2

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
