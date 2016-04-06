'use strict'

angular.module('myApp')
  .service('GoToQuestion', ['$http', '$state', '$cookieStore', function($http, $state, $cookieStore) {

    this.grabQuestion = function(questID) {
    	$cookieStore.put('qid', questID);

        // Query DB for question, send questionid as param (cookies don't mix well with routes)
        return $http.get('/api/data/questions/' + questID);
    }


  }]);

