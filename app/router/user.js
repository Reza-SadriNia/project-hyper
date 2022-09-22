const { UserController } = require('../http/controller/user.controller');
const { autoLogin } = require('../http/middleware/autologin');
const { expressValidatorMapper } = require('../http/middleware/checkError');
const { mongoIdValidator } = require('../http/validation/public');

const router = require('express').Router();

router.get(
	'/userprofile',
	autoLogin,
	expressValidatorMapper,
	UserController.getUserProfile
);

router.post(
	'/editprofile/:id',
	mongoIdValidator(),
	autoLogin,
	expressValidatorMapper,
	UserController.editProfile
);

module.exports = {
	userRoutes: router,
};
