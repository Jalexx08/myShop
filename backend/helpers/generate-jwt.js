const jwt = require("jsonwebtoken");

const gnerateJWT = (id = "") => {
	return new Promise((resolve, reject) => {
		const payload = { id };
		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{},(err, token) => {
				if (err) {
					console.log(err);
					reject("Token can not generate");
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	gnerateJWT,
};
