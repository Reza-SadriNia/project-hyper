const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		description: { type: String },
		username: { type: String },
		users: { type: [String], default: [] },
		profile_image: { type: String },
		projects: { type: String },
		owner: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const TeamModel = mongoose.model('team', TeamSchema);

module.exports = { TeamModel };
