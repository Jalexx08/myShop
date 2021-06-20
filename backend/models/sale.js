const { Schema, model } = require("mongoose");

const SaleSchema = Schema({
	code: {
		type: Number,
		default: 0,
		required: true
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	state: {
		type: Boolean,
		default: true,
		required: true,
	},

	amount: {
		type: Number,
		default: 0,
	},
	total: {
		type: Number,
		default: 0,
	},

	description: { type: String },
	date: { type: Date, default: Date.now },
});

module.exports = model("Sale", SaleSchema);
