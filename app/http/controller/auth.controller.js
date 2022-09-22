const { UserModel } = require('../../models/UserModel');
const { hash_string, tokenGenerator } = require('../../modules/functions');
const bcrypt = require('bcrypt');

class AuthController {
	async register(req, res, next) {
		const { first_name, last_name, age, username, email, password, phone } =
			req.body;
		const hash_password = hash_string(password);
		const register = UserModel.create({
			first_name,
			last_name,
			age,
			username,
			email,
			password: hash_password,
			phone,
		});
		// if (!register) throw { status: 400, message: 'Register Failed!' };
		return res.status(200).json({
			status: 200,
			success: true,
			message: 'Register Successful',
		});
	}
	async login(req, res, next) {
		try {
			const { username, password } = req.body;
			const user = await UserModel.findOne({ username });

			if (!user)
				throw { status: 401, message: 'username or Password its Wrong!' };

			const comparePass = bcrypt.compareSync(password, user.password);
			if (!comparePass) {
				throw { status: 401, message: 'username or Password its Wrong!' };
			}
			const token = tokenGenerator({ username });
			user.token = token;
			await user.save();

			return res.status(200).json({
				status: 200,
				success: true,
				token: tokenGenerator({ username }),
			});
		} catch (error) {
			next(error);
		}
	}
	async resetpassword(req, res, next) {}
}

module.exports = {
	AuthController: new AuthController(),
};
