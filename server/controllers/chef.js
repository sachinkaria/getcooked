'use strict';

const User = require('../models/user');

exports.listChefs = function(req, res) {
    User.find({role:'chef'}).exec(function(err, chefs){
        res.jsonp(chefs)
    });
};