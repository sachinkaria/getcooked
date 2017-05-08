//model/comments.js
'use strict';
//import dependency
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
const ChefSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    });

module.exports = ChefSchema;