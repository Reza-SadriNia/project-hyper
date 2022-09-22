const { param } = require('express-validator');

function mongoIdValidator() {
	return [param('id').isMongoId().withMessage('Invalid Id')];
}

module.exports = {
	mongoIdValidator,
};
