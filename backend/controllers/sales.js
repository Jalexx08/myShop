const { request, response } = require("express");
const { Category, Sale } = require("../models");

const getSales = async (req = request, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { state: true };

	const [total, sales] = await Promise.all([
		Sale.countDocuments(query),
		Sale.find(query)
			.skip(Number(from))
			.limit(Number(limit))
			.populate("product", "name"),
	]);

	res.status(200).json({
		total,
		sales,
	});
};
const getSaleById = async (req = request, res = response) => {
	const { id } = req.params;
	const sale = await Sale.findById(id).populate("product", "name");

	if (!sale)
		return res.status(400).json({
			msg: "There is no sale",
		});

	res.status(200).json({ sale });
};

const createSale = async (req = request, res = response) => {
	const { code, ...rest } = req.body;

	const saleDB = await Sale.findOne({ code });

	if (saleDB)
		return res.status(400).json({
			msg: `The sale ${saleDB.code} is already registered`,
		});

	const data = {
		code,
		...rest
	};

	const sale = new Sale(data);

	await sale.save();

	res.status(200).json(sale);
};

const updateSale = async (req = request, res = response) => {
	const { id } = req.params;

	const { state, ...data } = req.body;

	const sale = await Sale.findByIdAndUpdate(id, data, {
		new: true,
	}).populate("product", "name");

	res.status(200).json({ sale });
};

const deleteSale = async (req = request, res = response) => {
	const { id } = req.params;

	const saleDel = await Sale.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);

	res.status(200).json({ saleDel });
};

module.exports = {
	createSale,
	deleteSale,
	getSales,
	getSaleById,
	updateSale,
};
