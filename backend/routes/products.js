const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, isAdminRole } = require("../middlewares");

const {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products");

const { isProductById, isCategoryById } = require("../helpers/db-validators");

const router = Router();

router.get("/", getProducts);

router.get(
	"/:id",
	[
		check("id", "It is not Id of Mongo").isMongoId(),
		check("id").custom(isProductById),
		validateFields,
	],
	getProductById
);
router.post(
	"/",
	[
		validateJWT,
		check("name", "The name is required").not().isEmpty(),
		check("category", "It is not Mongo id").isMongoId(),
		check("category").custom( isCategoryById),
		validateFields,
	],
	createProduct
);
router.put(
	"/:id",
	[
		validateJWT,
        check("id", "It is not Id of Mongo").isMongoId(),
		check("id").custom(isProductById),
		validateFields,
	],
	updateProduct
);
router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "It is not Id of Mongo").isMongoId(),
		check("id").custom(isProductById),
		validateFields,
	],
	deleteProduct
);

module.exports = router;
