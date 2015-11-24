var mongoose = require("mongoose");

 module.exports = mongoose.model('TestCase', {
 	name: String, 
 	description: String
 });