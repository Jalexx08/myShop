const { response } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { gnerateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({
				msg: "User/ password are not corrects -email",
			});

		if (!user.state)
			return res.status(400).json({
				msg: "User/ password are not corrects -state:false",
			});

		const hash = await bcrypt.compare(password, user.password);
		if (!hash)
			return res.status(400).json({
				msg: "User/ password are not corrects - password",
			});

		const token = await gnerateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "There is a problem in server. Call administrator",
		});
	}
};

module.exports = {
	login,
};
