const { UserModel } = require('../../models/UserModel');

class UserController {
	async getUserProfile(req, res, next) {
		try {
			const user = req.user;
			return res.status(200).json({
				status: 200,
				success: true,
				user,
			});
		} catch (error) {
			next(error);
		}
	}
	async editProfile(req, res, next) {
		try {
			let data = req.body;
			const userId = req.user._id;
			let field = ['first_name', 'last_name', 'skill'];
			let badvalue = ['', ' ', null, undefined, 0, -1, NaN, [], {}];

			Object.entries(data).forEach(([key, value]) => {
				if (!field.includes(key)) delete data[key];
				if (badvalue.includes(value)) delete data[key];
			});
			const result = await UserModel.updateOne({ _id: userId }, { $set: data });
			if (result.modifiedCount > 0) {
				return res.status(200).json({
					status: 200,
					success: true,
					message: 'update success',
				});
			}
			throw { status: 400, message: 'update failed' };
		} catch (error) {
			next(error);
		}
	}
	// async editProfile(req, res, next) {
	// 	try {
	// 		const userId = req.user._id;
	// 		const user = await UserModel.updateOne(
	// 			{ _id: userId },
	// 			{ $set: { ...req.body } }
	// 		);
	// 		if (!user) throw { status: 400, message: 'User NotFound!' };
	// 		return res.status(200).json({
	// 			status: 200,
	// 			success: true,
	// 			message: 'update Success',
	// 		});
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }
	uploadProfileImage() {}
}

module.exports = {
	UserController: new UserController(),
};
