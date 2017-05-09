'use strict';

const User = require('../models/user');

module.exports.listChefs = listChefs;

function listChefs (req, res) {
    User.find({role:'chef'}).exec(function(err, chefs){
        res.jsonp(chefs)
    });
}