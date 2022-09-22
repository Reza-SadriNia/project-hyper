const { TeamModel } = require('../../models/TeamModel');
const createError = require('http-errors');
class TeamController {
	async createTeam(req, res, next) {
		try {
			const { name, description } = req.body;
			const owner = req.user._id;
			const username = req.user.username;
			const team = await TeamModel.create({
				name,
				description,
				owner,
				username,
			});
			if (!team) throw { status: 500, message: 'Create Team Failed!' };
			return res.status(201).json({
				status: 201,
				success: true,
				message: 'Create Success!',
			});
		} catch (error) {
			next(error);
		}
	}
	async getListOfTeam(req, res, next) {
		const team = await TeamModel.find({});
		if (!team) throw createError[400];
		return res.status(200).json(team);
	}
	async getTeamById(req, res, next) {
		try {
			const TeamId = req.params.id;
			const findResult = await TeamModel.findOne({ TeamId }, { __v: 0 });
			if (!findResult) throw { status: 400, message: 'Team Not Found !' };
			return res.status(200).json(findResult);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = {
	TeamController: new TeamController(),
};
