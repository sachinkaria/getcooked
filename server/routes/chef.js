const AuthenticationController = require('../controllers/authentication');
const ChefController = require('../controllers/chefs');

module.exports = function (app) {
  app.post('/api/chefs/create', AuthenticationController.registerChef);
  app.get('/api/chefs', ChefController.listChefs);
  app.get('/api/chefs/:id', ChefController.getChef);
};