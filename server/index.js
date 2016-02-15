var express = require('express');
var Path = require('path');
var sass = require('node-sass-endpoint');
var session = require('cookie-session');
var MP = require('node-makerpass');
var morgan  = require('morgan');
var Promise = require('bluebird');

var routes = express.Router();
routes.use(morgan('dev'));

// First set up sessions (independent of MakerPass and OAuth)
// This will give your middleware & endpoints access to req.session
//

routes.use(session({
  name: '_auth_session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}));

//
// Now set up passport.
// Authenticate with MakerPass, and attach accessToken to session.
//
var passport = require('passport');
var MakerpassStrategy = require('passport-makerpass').Strategy;

passport.use(new MakerpassStrategy({
    clientID: process.env.MAKERPASS_CLIENT_ID,
    clientSecret: process.env.MAKERPASS_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/makerpass/callback",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log("GOT TOKEN:", accessToken)
    req.session.accessToken  = accessToken
    req.session.refreshToken = refreshToken
    done()
  }
));

//
// Attach Passport to the app
//
routes.use(passport.initialize())

//
// Direct your browser to this route to start the OAuth dance
//
routes.get('/auth/makerpass', //what is this? 
  passport.authenticate('makerpass'));

//
// During the OAuth dance, MakerPass will redirect your user to this route,
// of which passport will mostly handle.
//
//////////////////////////This is calling the failureRedirect, i added /# to the failureRedirect
routes.get('/auth/makerpass/callback',
  passport.authenticate('makerpass', { successRedirect: '/#/', failureRedirect: '/#/login', 
  failFlash: true }),
  function(req, res) {
    console.log("WORKING")
    // Successful authentication, do what you like at this point :)
    // routes.use(express.static(assetFolder));
    res.redirect('/#/');
  });

//route to your index.html
var assetFolder = Path.resolve(__dirname, '../client/');
 routes.use(express.static(assetFolder));

// Example endpoint (also tested in test/server/index_test.js)
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'angular'])
});

if (process.env.NODE_ENV !== 'test') {
//I am attempting to redirect to auth/makerpass here if no accessToken
//routes.use on line 72 is loading the index page before this function
//comment that out to see this functionality. Getting the index page this 
//way causes html to load incorrectly.
  routes.get('/', function(req, res){
    console.log("TOKEN:::::", req.session.accessToken)
    if (!req.session.accessToken) {
      res.redirect('/auth/makerpass')
    } else {
      // routes.use(express.static(assetFolder));
      res.sendFile( assetFolder + '/index.html' )
    }
  });

  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  // We're in development or production mode;
  // create and run a real server.
  var app = express();

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