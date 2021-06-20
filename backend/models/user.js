const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "The name is required"],
	},
	email: {
		type: String,
		required: [true, "The email is required"],
		unique: true,
	},

	password: {
		type: String,
		required: [true, "The password is required"],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default:"CUSTOMER",
	},
	state: {
		type: Boolean,
		default: true,
	},
	date: { type: Date, default: Date.now },
});


module.exports = model("User", UserSchema);
