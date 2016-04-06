var express = require('express'),
    knex = require('knex')({
		  client: 'pg',
		  connection: {
		    database: 'stackdb_db'
		  }
		});

module.exports = {

	getAll: function(req, res) {
	  // console.log("Getting all questions");
	  // Order in reverse (newest first)
	  knex('questions').select().orderBy('questiondate', 'desc')
	  .then(function(questions) {
	    // Pass data back to controller /src/main.js
	    res.send({questions: questions});
	  })
	  .catch(function(err) {
	    console.log("Error", err)
	    res.redirect('/auth/makerpass')
	  })
	},

	getOne: function(req, res) {
	  // console.log("Let's take a closer look at question ", req.params[0]);
	  knex('questions').where({questionid: req.params[0]})
	  .then(function(singleQuest) {
	    // Send back question data to controller /src/question.js
	  knex('questions').where({questionid: req.params[0]})
	    .then(function(singleQuest) {
	      res.send({singleQuestion: singleQuest});
	    })
	  })
  },

	postQuest: function(req, res) {
	  // Get data from req body
	  // console.log("You are asking a question. Good for you.");
	  // Insert that data into DB
	  knex('questions').insert({questiontitle: req.body.title, questiontext: req.body.text, questiondate: req.body.time})
	    // query db to get questionid of the question we just asked with date
	  .then(function(resp) {
	    knex('questions').where({questiondate: req.body.time}).select('questionid')
	    // After query DB, take data and send back to controller /src/submit.js
	    .then(function(questid) {
	      res.send({questid: questid[0].questionid});
	    })
	  })
	},

	getAnswer: function(req, res) {
	  // Query DB for answers
	  // console.log("Getting answers to increase your knowledge");
	  // First do a left outer join to get answers/users that match on userid
	  var subquery = knex.select('*').from('answers').leftOuterJoin('users', 'answers.fk_answeredbyuserid', 'users.userid');
	  // Then, query answers table on condition the questionid in answer matches parameter, and the subquery
	  knex('answers').where({fk_questionid: req.params[0]}, subquery)
	  .then(function(data) {
	    // Send data back to controller: /src/services/question.js
	    res.send(data);
	  })
	  .catch(function(err) {
	    console.log("Something went wrong", err);
	  })
	},

	postAnswer: function(req, res) {
	  // console.log("You are developing others. Way to go!");
	  knex('answers').insert({answertext: req.body.text, fk_questionid: req.body.id, answerdate: req.body.time})
	  .then(function(resp) {
	    // After query to DB, end response to fufill promise
	    // console.log("Should insert answer");
	    res.end();
	  })
	}

}