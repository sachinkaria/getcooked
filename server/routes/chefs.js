const AuthenticationController = require('../controllers/authentication'),
    ChefController = require('../controllers/chef');

module.exports = function(app) {
    // Registration route
    app.post('/chefs/create', AuthenticationController.registerChef);

    // search chefs
    app.get('/chefs', ChefController.listChefs);

    // chef profile
    app.get('/chefs/:id', ChefController.getChef);
};