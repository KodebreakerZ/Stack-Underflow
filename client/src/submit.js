'use strict'
//This is controller for the question submission page
//It corresponds to the view submit.html
angular.module('myApp')
  .controller('SubmitCtrl', [ '$scope', '$http', '$state', '$cookieStore', 'GoToQuestion', function( $scope, $http, $state, $cookieStore, GoToQuestion) {

    //We will need to make sure this matches the limitations in our database

    $scope.maxTitleLength = 100;
    $scope.maxAnswerLength = 1000;
    $scope.htmlcontent = '';

    // Sending post request to server to then insert into DB
        // Once that is successful, redirect to a page with that question populating page
    // Eventually need user info to include in data object
    $scope.submitQ = function(title, text) {
        console.log('submitting with title', title, 'text', text);
        // get current date and convert to more legible timestamp
        var timestamp = (Date.now());
        var currentDate = new Date(timestamp);
// <<<<<<< HEAD
        var user = $cookieStore.get('uid');
//         // console.log("Here is our user", user);
//         var data = {title: title, text: text, time: currentDate, fkaskedby: user};
//         console.log("About to make a post request", data);
//         $http.post("/api/questions", data)
//         .success(function(resp, status) {
//             console.log("Successfully asked a question - id is is", resp.questid);
//             $http.get('/api/questions/' + resp.questid)
// =======
        // Take data from form, convert to object, send with post req to db
        var data = {title: title, text: text, time: currentDate};
        $http.post("/api/data/questions", data)
        .success(function(resp, status) {
            // console.log("Cookie should not have changed, have to use resp", resp.questid);
            // Cookies act weird on routes, set params instead => Send questid along with get request to DB to get question just asked
            $http.get('/api/data/questions/' + resp.questid)
// >>>>>>> 7cb4a878e0a79701ddc90aa758164a940dc83107
            .success(function(resp, status) {
                console.log("Redirecting with id ", resp.singleQuestion[0].questionid);
                $cookieStore.put('qid', resp.singleQuestion[0].questionid);
                $state.go('question', {questionID: resp.singleQuestion[0].questionid});
            })
        })
    };

  }]);
