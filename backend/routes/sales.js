const { Router } = require("express");
const { check } = require("express-validator");

const {
	validateJWT,
	validateFields,
	isAdminRole,
	hasRole,
} = require("../middlewares/");

const { isCategoryById, isSaleById } = require("../helpers/db-validators");
const {
	getSales,
	getSaleById,
	createSale,
	updateSale,
	deleteSale,
} = require("../controllers/sales");

const router = Router();

router.get(
	"/",
	[validateJWT, hasRole("ADMIN", "EMPLOYEE"), validateFields],
	getSales
);

router.get(
	"/:id",
	[
		validateJWT,
		hasRole("ADMIN", "EMPLOYEE"),
		check("id", "It is not Id of Mongo").isMongoId(),
		check("id").custom(isSaleById),
		validateFields,
	],
	getSaleById
);

router.post(
	"/",
	[
		validateJWT,
		hasRole("ADMIN", "EMPLOYEE"),
		validateJWT,
		check("product", "It is not Id of Mongo").isMongoId(),
		validateFields,
	],
	createSale
);

router.put(
	"/:id",
	[validateJWT, isAdminRole, check("id").custom(isSaleById), validateFields],
	updateSale
);

router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "It is not Id of Mongo").isMongoId(),
		check("id").custom(isSaleById),
		validateFields,
	],
	deleteSale
);

module.exports = router;
