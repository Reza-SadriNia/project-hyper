const { verifyjwtToken } = require('../../modules/functions');
const { UserModel } = require('../../models/UserModel');

const autoLogin = async (req, res, next) => {
	try {
		const authorization = req?.headers?.authorization;
		if (!authorization)
			throw { status: 401, message: 'Authorization Not Found!' };
		let token = authorization.split(' ')?.[1];
		if (!token) throw { status: 401, message: 'token Not Found!' };
		const result = verifyjwtToken(token);
		const { username } = result;
		const user = await UserModel.findOne({ username });
		if (!user) throw { status: 401, message: 'User Not Found!' };
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	autoLogin,
};
