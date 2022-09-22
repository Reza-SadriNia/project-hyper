const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		age: { type: Number },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		roles: { type: [String], default: ['USER'] },
		profile_image: { type: String },
		skill: { type: [String], default: [] },
		teams: { type: [String], default: [] },
		token: { type: String },
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model('users', UserSchema);

module.exports = {
	UserModel,
};
