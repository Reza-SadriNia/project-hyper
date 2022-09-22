const { TeamController } = require('../http/controller/team.controller');
const { autoLogin } = require('../http/middleware/autologin');
const { expressValidatorMapper } = require('../http/middleware/checkError');
const { mongoIdValidator } = require('../http/validation/public');
const router = require('express').Router();

router.post(
	'/create',
	autoLogin,
	expressValidatorMapper,
	TeamController.createTeam
);

router.get(
	'/listOfTeam',
	autoLogin,
	expressValidatorMapper,
	TeamController.getListOfTeam
);

router.get(
	'/:id',
	autoLogin,
	mongoIdValidator(),
	expressValidatorMapper,
	TeamController.getTeamById
);

module.exports = {
	teamRoutes: router,
};
