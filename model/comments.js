//model/comments.js
'use strict';
//import dependency
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
let CommentsSchema = new Schema({
    author: String,
    text: String
});
//export our module to use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);