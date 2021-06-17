const { Router } = require("express");
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');

const { isRoleValid, isEmail, isUserById } = require('../helpers/db-validators');

const {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers,
} = require("../controllers/users");


const router = Router();

router.get("/", getUsers);

router.post("/",[
	check('name','The name is required').not().isEmpty(),
	check('password','The password is required and min 6 chracters').isLength({min: 6}),
	check('email','This email is not valid').isEmail(),
	check('email','This email is not valid').custom(isEmail),
	check('role').custom(isRoleValid),
	validateFields
], postUsers);

router.put("/:id",[
	check('id', 'ID is not valid').isMongoId(),
	check('id').custom( isUserById),
	check('role').custom(isRoleValid),
	validateFields
], putUsers);


router.delete("/:id",[
	validateJWT,
	check('id', 'ID is not valid').isMongoId(),
	check('id').custom( isUserById),
	validateFields

] ,deleteUsers);

module.exports = router;
