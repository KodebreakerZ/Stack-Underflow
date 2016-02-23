'use strict'

angular.module('myApp')
  .service('SubmitAnswer', function($http) {

    // var Answer = function(text) {
    //     return {
    //         user: "placeholder", //can we get this from a global variable? Need to figure out how to keep track of user
    //         text: text
    //     };
    // };

    this.submitA= function(text, qid, userid) {
        // Get current date (similar to question submission)
        var timestamp = (Date.now());
        var currentDate = new Date(timestamp);
        // Take data from form, convert to object, send with post req to DB
        var data = {text: text, id: qid, time: currentDate, fkansweredby: userid};
        return $http.post('/api/answer', data);
    };

  });

