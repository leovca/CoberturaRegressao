var mongoose = require("mongoose");

 module.exports = mongoose.model('Application', {
 	name: String, 
 	appMainClass: String, 
 	repoDir: String
 });