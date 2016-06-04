var express = require('express');
var Path = require('path');
var sass = require('node-sass-endpoint');
var db  = require('./db');

console.log('-----------------------------------------databaseURL----------------------', process.env.DATABASE_URL);

// need to require knex to use the functions for DB
// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     database: 'stackdb_db'
//   }
// });

var routes = express.Router();

//route to your index.html
var assetFolder = Path.resolve(__dirname, '../client/');
  routes.use(express.static(assetFolder));

if (process.env.NODE_ENV !== 'test') {
//The following GET request now works but only if the catch-all 
//route is commented out as well as routes.use below the assetFolder
// declaration. It works but I don't think it is correct
  
  
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  // We're in development or production mode;
  // create and run a real server.
  var app = express();
  // configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  // This compiles your Sass files
  // Remember to change file paths or directories
  app.get(
    '/main.css',
    sass.serve('./client/sass/main.scss', {

      // (dev only) defaults to parent folder of scss file.
      // Any sass file changes in this directory will clear the output cache.
      watchDir: './client/sass/',

      // defaults to parent folder of scss file
      includePaths: ['./client/sass/'],

      // defaults to false
      debug: false
    })
  )

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port", port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}