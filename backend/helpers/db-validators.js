const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
	const existRole = await Role.findOne({ role });
	if (!existRole) {
		throw new Error(`The role ${role} is not registred in DB`);
	}
};

const isEmail = async (email = "") => {
	const existEmail = await User.findOne({ email });
	if (existEmail) throw new Error(`The email: ${ email } is already registered`);
};

const isUserById = async(id) => {
	const existUser = await User.findById(id);
	if (!existUser) throw new Error(`The ID: ${ id } not exist`);
}

module.exports = {
	isRoleValid,
	isEmail,
	isUserById
};
