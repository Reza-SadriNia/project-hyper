const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function hash_string(str) {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload) {
	const token = jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: '3days',
	});
	return token;
}

function verifyjwtToken(token) {
	const result = jwt.verify(token, process.env.SECRET_KEY);
	if (!result?.username)
		throw { status: 401, message: 'Please Login To Your Account' };
	return result;
}

module.exports = {
	hash_string,
	tokenGenerator,
	verifyjwtToken,
};
