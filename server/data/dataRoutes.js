var dataController = require('./dataController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js

  app.get('/questions', dataController.getAll);
  app.get('/questions/*', dataController.getOne);
  app.post('/questions', dataController.postQuest);

  app.get('/getAnswers/*', dataController.getAnswer);
  app.post('/answer', dataController.postAnswer);
};
