const AuthenticationController = require('../controllers/authentication');
const ChefController = require('../controllers/chefs');

module.exports = function (app) {
  app.post('/chefs/create', AuthenticationController.registerChef);
  app.get('/chefs', ChefController.listChefs);
  app.get('/chefs/:id', ChefController.getChef);
};