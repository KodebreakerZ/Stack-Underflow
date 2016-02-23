var userController = require('./userController.js');

<<<<<<< HEAD
module.exports = function(app) {
	app.post('/signin', userController.signin);
	app.post('/signup', userController.signup);
}
=======

module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
};
>>>>>>> b642c6b1719c79be15b64fdb7c2c79ad4a949cb2
