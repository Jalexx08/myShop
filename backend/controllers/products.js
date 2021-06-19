const { request, response } = require("express");
const { Product } = require("../models");

const getProducts = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { state: true };

	const [total, products] = await Promise.all([
		Product.countDocuments(query),
		Product.find(query)
			.skip(Number(from))
			.limit(Number(limit))
			.populate("user", "name")
			.populate("category", "name"),
	]);

	res.json({
		total,
		products,
	});
};
const getProductById = async (req = request, res = response) => {
	const { id } = req.params;
	const product = await Product.findById(id)
		.populate("user", "name")
		.populate("category", "name");

	if (!product)
		return res.status(400).json({
			msg: "There is no product",
		});

	res.status(200).json({ product });
};

const createProduct = async (req = request, res = response) => {
	const { state, user, ...rest } = req.body;

	const productDB = await Product.findOne({ name: rest.name });

	if (productDB)
		return res.status(400).json({
			msg: `The product ${productDB.name} is already registered`,
		});

	const data = {
		...rest,
		name: rest.name.toUpperCase(),
		user: req.user._id,
	};

	const product = new Product(data);

	await product.save();

	res.status(200).json(product);
};

const updateProduct = async (req = request, res = response) => {
	const { id } = req.params;

	const { state, user, ...data } = req.body;

	if (data.name) {
		data.name = data.name.toUpperCase();
	}

	data.user = req.user._id;

	const product = await Product.findByIdAndUpdate(id, data, { new: true });

	res.status(200).json({ product });
};

const deleteProduct = async (req = request, res = response) => {
	const { id } = req.params;

	const { state, user, ...data } = req.body;

	if (data.name) {
		data.name = data.name.toUpperCase();
	}

	data.user = req.user._id;

	const productDel = await Product.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);

	res.status(200).json({ productDel });
};

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
