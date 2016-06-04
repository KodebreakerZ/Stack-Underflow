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
      if (data[0] === undefined) {
      res.send({error: 'Username or password is invalid.'})
      } else {
        var token = jwt.encode(username, 'secret');
          res.send({token: token, uid: data[0].userid});
      }
    })
  },

  signup: function (req, res, next) {
    //need to check db to see if user already exists
    //then need to compare password
    var username  = req.body.username,
        password  = req.body.password;
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
          res.send({token: token, uid: user[0].userid});
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      }
    });
  },
};

