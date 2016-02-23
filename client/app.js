'use strict';

angular.module('myApp', [
    'myApp.auth',
    'ui.router',
    'ngCookies',
    'infinite-scroll',
    'angularMoment',
    'textAngular'
  ])

    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })

        .state('signup', {
          url: '/signup',
          templateUrl: 'views/signup.html',
          controller: 'AuthController'
        })

        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            authenticate: true
        })

        .state('submit', {
            url: '/submit',
            templateUrl: 'views/submit.html',
            controller: 'SubmitCtrl',
            authenticate: true
        })

        .state('question', {
             url: '/question',
             templateUrl: 'views/question.html',
             controller: 'QuestionCtrl',
             authenticate: true,
        })

        .state('logout', {
             url: '/logout',
             templateUrl: 'views/logout.html',
             controller: 'LogoutCtrl',
             authenticate: true
        });

        // We add our $httpInterceptor into the array
        // of interceptors. Think of it like middleware for your ajax calls
        $httpProvider.interceptors.push('Authenticate');

})
.factory('Authenticate', function ($window) {
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('com.underflow');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, Auth) {
  // Everything is running, listening for change state and if the next state requires authentication.
$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  if (toState.authenticate && Auth.isAuth() === false) {
    $state.transitionTo("login");
    event.preventDefault();
    };
  })
});

