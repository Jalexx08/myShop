const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
	let token = req.header("Authorization");
	if (!token) return res.status(401).send("Authorization denied: no token");

	token = token.split(" ")[1];
	if (!token) return res.status(401).send("Authorization denied: no token");

	try {
		const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		const user = await User.findById(id);

        if( !user ) return res.status(401).json({
            msg: 'Tokeno is invalid user-no-DB'
        });

        if( !user.state ) return res.status(401).json({
            msg: 'Tokeno is invalid user-inactive'
        });

		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({
			msg: "Authorization denied: invalid token",
		});
	}
};

module.exports = {
	validateJWT,
};
