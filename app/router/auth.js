const { AuthController } = require('../http/controller/auth.controller');
const { expressValidatorMapper } = require('../http/middleware/checkError');
const {
	registerValidation,
	loginValidation,
} = require('../http/validation/auth');

const router = require('express').Router();

router.post(
	'/register',
	registerValidation(),
	expressValidatorMapper,
	AuthController.register
);

router.post(
	'/login',
	loginValidation(),
	expressValidatorMapper,
	AuthController.login
);

module.exports = {
	authRoutes: router,
};
