const { request, response } = require("express");
const { Category } = require("../models");

const getCategories = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { state: true };

	const [total, categories] = await Promise.all([
		Category.countDocuments(query),
		Category.find(query)
			.skip(Number(from))
			.limit(Number(limit))
			.populate("user", "name"),
	]);

	res.json({
		total,
		categories,
	});
};
const getCategoryById = async (req = request, res = response) => {
	const { id } = req.params;
	const category = await Category.findById(id).populate("user", "name");

	if (!category)
		return res.status(400).json({
			msg: "There is no category",
		});

	res.status(200).json({ category });
};

const createCategory = async (req = request, res = response) => {
	const name = req.body.name.toUpperCase();

	const categoryDB = await Category.findOne({ name });

	if (categoryDB)
		return res.status(400).json({
			msg: `The category ${categoryDB.name} is already registered`,
		});

	const data = {
		name,
		user: req.user._id,
	};

	const category = new Category(data);

	await category.save();

	res.status(200).json(category);
};

const updateCategory = async (req = request, res = response) => {
	const { id } = req.params;

	const { state, user, ...data } = req.body;

	data.name = data.name.toUpperCase();
	data.user = req.user._id;

	const category = await Category.findByIdAndUpdate(id, data, {
		new: true,
	}).populate("user", "name");

	res.status(200).json({ category });
};

const deleteCategory = async (req = request, res = response) => {
	const { id } = req.params;

	const categoryDel = await Category.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);

	res.status(200).json({ categoryDel });
};

module.exports = {
	createCategory,
	getCategories,
	getCategoryById,
	updateCategory,
	deleteCategory,
};
