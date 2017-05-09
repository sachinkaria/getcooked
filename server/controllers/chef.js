'use strict';

const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports.listChefs = list;
module.exports.getChef = read;

function list (req, res) {
    User.find({role:'chef'}).exec(function(err, chefs){
        res.jsonp(chefs)
    });
}

function read (req, res) {
    let id = req.params.id;
    User.find({_id: ObjectId(id)}).exec(function(err, chef){
        res.jsonp(chef[0])
    });
}