var jwt = require('jwt-simple');
var express = require('express');
var knex = require('knex')({
	client: 'pg',
	connection: {
		database: 'stackdb_db'
	}
});

module.exports = {
	signin: function(req, res, next) {
		var username = req.body.username,
			password = req.body.password;

	knex('users').where({username: req.body.username, password: req.body.password})
		.then(function(data) {
			if (data[0] === undefined) {
				res.send({error: 'Username or password is invalid.'})
			} else {
				var token = jwt.encode(username, 'secret');
				res.send({token: token});
			}
		})
	},

	signup: function(req, res, next) {
		var username = req.body.username,
			password = req.body.password;

	knex('users').where({username: req.body.username})
		.then(function(data) {
			if (data[0] === undefined) {
				knex('users').insert({username: req.body.username, password: req.body.password})
				.then(function() {
					return knex('users').where({username: req.body.username})
					.then(function(user) {
						var token = jwt.encode(username, 'secret');
						res.send({token: token});
					})
					.catch(function(error) {
						console.log("Something went wrong", error);
					});
				})
			}
		});
	}
};