<<<<<<< HEAD
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
				res.send({token: token, uid: data[0].userid});
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
						res.send({token: token, uid: user[0].userid});
					})
					.catch(function(error) {
						console.log("Something went wrong", error);
					});
				})
			}
		});
	}
};
=======
var jwt  = require('jwt-simple'),
    express = require('express');
    knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'stackdb_db'
  }
});

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    knex('users').where({username: req.body.username, password: req.body.password})
    .then(function(data) {
      console.log('res userctrl', data)
      console.log('res.length', data[0])
      if (data[0] === undefined) {
      res.send({error: 'Username or password is invalid.'})
      } else {
        var token = jwt.encode(username, 'secret');
          // console.log("TOKEN", token, "user:", user)
          res.send({token: token});
      }
    })
  },

  signup: function (req, res, next) {
    //need to check db to see if user already exists
    //then need to compare password
    //

    var username  = req.body.username,
        password  = req.body.password;
        console.log('req.body', req.body)

  //       knex('users').insert({username: req.body.username, password: req.body.password})
  // .then(function(resp) {
    // query db to get userid of the question we just asked
    knex('users').where({username: req.body.username})
    .then(function(data) {
      console.log('res userctrl', data)
      console.log('res.length', data[0])
      if (data[0] === undefined) {
        knex('users').insert({username: req.body.username, password: req.body.password})
        .then(function(){
          return knex('users').where({username: req.body.username})
          .then(function (user) {
          // create token to send back for auth
          var token = jwt.encode(username, 'secret');
          res.send({token: token});
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      }
    });
  },

  // checkAuth: function (req, res, next) {
  //   // checking to see if the user is authenticated
  //   // grab the token in the header is any
  //   // then decode the token, which we end up being the user object
  //   // check to see if that user exists in the database
  //   // var token = req.headers['x-access-token'];
  //   // if (!token) {
  //   //   next(new Error('No token'));
  //   // } else {
  //   //   var user = jwt.decode(token, 'secret');
  //   //   var findUser = Q.nbind(User.findOne, User);
  //   //   findUser({username: user.username})
  //   //     .then(function (foundUser) {
  //   //       if (foundUser) {
  //   //         res.status(200).send();
  //   //       } else {
  //   //         res.status(401).send();
  //   //       }
  //   //     })
  //   //     .fail(function (error) {
  //   //       next(error);
  //   //     });
  //   // }
  // }
};
>>>>>>> b642c6b1719c79be15b64fdb7c2c79ad4a949cb2
