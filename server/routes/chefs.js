const AuthenticationController = require('../controllers/authentication'),
    ChefController = require('../controllers/chef');

module.exports = function(app) {
    // Registration route
    app.post('/auth/chef/register', AuthenticationController.registerChef);

    // search chefs
    app.get('/chefs', ChefController.listChefs);
};