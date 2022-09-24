var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/gmaildb");

var userSchema = mongoose.Schema({
	name: String,
	username: String,
	email: String,
	password: String,
	image: {
		type: String,
		default: "default.jpg"
	},
	sentmails: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "mail"
	}],
	receivedmails: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "mail"
		
	}],
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);