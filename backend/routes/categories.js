const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT, validateFields, isAdminRole } = require("../middlewares/");
const {
	createCategory,
	getCategories,
	getCategoryById,
	updateCategory,
	deleteCategory,
} = require("../controllers/categories");
const { isCategoryById } = require("../helpers/db-validators");

const router = Router();

router.get("/", getCategories);

router.get(
	"/:id",
	[
		check("id", "It is not Id of Mongo").isMongoId(),
		check("id").custom(isCategoryById),
		validateFields,
	],
	getCategoryById
);

router.post(
	"/",
	[
		validateJWT,
		check("name", "The name is required").not().isEmpty(),
		validateFields,
	],
	createCategory
);

router.put(
	"/:id",
	[
		validateJWT,
		check("id").custom(isCategoryById),
		check("name", "The name is required").not().isEmpty(),
		validateFields,
	],
	updateCategory
);

router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "It is not Id of Mongo").isMongoId(),
		check("id").custom(isCategoryById),
		validateFields,
	],
	deleteCategory
);

module.exports = router;
