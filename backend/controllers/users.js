const { response, request } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { state: true };

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(from)).limit(Number(limit)),
	]);

	res.json({
		total,
		users,
	});
};

const postUsers = async (req = request, res = response) => {
	const { name, email, password, role } = req.body;
	const user = new User({ name, email, password, role });

	const hash = await bcrypt.hash(password, 10);
	user.password = hash;

	await user.save();

	res.json({ user });
};

const putUsers = async (req = request, res = response) => {
	const { id } = req.params;
	const { _id, password, ...resto } = req.body;


	if (password) {
		const hash = await bcrypt.hash(password, 10);
		user.password = hash;
	}

	const user = await User.findByIdAndUpdate(id, resto);

	res.json({user});
};

const deleteUsers = async (req = request, res = response) => {
	const { id } = req.params;

	const userAuth = req.user
	

	const user = await User.findByIdAndUpdate(id, { state: false });
	res.json({user, userAuth});
};

module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers,
};
