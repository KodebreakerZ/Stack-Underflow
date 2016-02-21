'use strict'
//This is controller for the question page
//It corresponds to the view question.html
angular.module('myApp')
  .controller('QuestionCtrl', [ '$scope', '$state', '$cookieStore', 'GoToQuestion', 'GetQuestionDetail', 'GetAnswers', 'SubmitAnswer',
  	                             function( $scope, $state, $cookieStore, GoToQuestion, GetQuestionDetail, GetAnswers, SubmitAnswer) {
    //FOR ANSWERS:
    //This must match the limitations in the database... picked 1000 chars arbitrarily
    // $scope.maxAnswerLength = 1000;
    // //This will start out as empty and get filled out as the user writes an answer
    // $scope.userInput = undefined;



    //TO SEE QUESTION AND PREVIOUS ANSWERS:
    //This is an object representing the question the user clicked on. It gets a value when the init function is run.
  	$scope.question = undefined;
    //This will by an array of all answer objects corresponding to $scope.question. It is populated when the init function is run.
  	$scope.answers = undefined;
    //These will each be formatted based on directives/answer.js

    // Submit answers to DB (submitAnswer.js)
    $scope.submitAnswer = function(text) {
      // Get questionid from cookie
      var cookieid = $cookieStore.get('qid');
      // Run req to db with form text and cookie id
      SubmitAnswer.submitA(text, cookieid)
      .then(function(data) {
        // Get answers from DB again
        return GetAnswers.getAnswersByQuestion(cookieid);
      })
      .then(function(resp) {
        // Take those answers and repopulate page
        return $scope.answers = resp.data;
     })
    };


    $scope.init = function() {
      // Get questionid from cookiestore (data persists)
      var cookieid = $cookieStore.get('qid');
      console.log("This should be a cookie id", cookieid);

      // Pass questionid from cookie along to query DB for question
      GoToQuestion.grabQuestion(cookieid)
      .then(function(question) {
        // Add question data to question object attached to scope
        return $scope.question = question.data.singleQuestion[0];
      })
      // Next, query DB for associated answers, pass question along to get id out
      .then(function(data) {
        return GetAnswers.getAnswersByQuestion(data.questionid);
      })
      .then(function(response) {
        // Add answer data to answer object attached to scope
        return $scope.answers = response.data;
      })

      //refers to services/getQuestionDetail (NEED TO WRITE THIS)
      // GetQuestionDetail.getQuestionDetail(questionId)
      //   .then( function(questionData) {
      //     $scope.question = questionData;
      //     return;
      //   })
      //   .then( function() {
      //     //refers to services/getAnswers (NEED TO WRITE THIS)
      //     return GetAnswers.getAnswersByQuestion(questionId)
      //   })
      //   .then (function(answersArray) {
      //     $scope.answers = answersArray;
      //     return;
      //   });
    }

    //Run the init function every time you hit this page
    $scope.init();

  }]);

