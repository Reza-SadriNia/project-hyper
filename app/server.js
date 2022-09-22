const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const { AllRoutes } = require('./router/router');
const createError = require('http-errors');

module.exports = class Application {
	constructor(PORT, DB_URL) {
		this.configDatabase(DB_URL);
		this.configApplication();
		this.createServer(PORT);
		this.createRoutes();
		this.errorHandler();
	}
	configDatabase(DB_URL) {
		mongoose.connect(DB_URL, (err) => {
			if (err) throw err;
			console.log('Connect to DB ...');
		});
	}
	configApplication() {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static(path.join(__dirname, '..', 'public')));
	}
	createServer(PORT) {
		app.listen(PORT, () => {
			console.log(`Server is Running on http://localhost:${PORT}`);
		});
	}
	createRoutes() {
		app.get('/', (req, res, next) => {
			res.status(200).json({
				Message: 'Welcome To Hyper Project',
			});
		});
		try {
			app.use(AllRoutes);
		} catch (error) {
			next(error);
		}
	}
	errorHandler() {
		app.use((req, res, next) => {
			return res.json({
				statusCode: 404,
				message: createError.NotFound('Route Not Found!'),
			});
		});
		app.use((err, req, res, next) => {
			const serverError = createError.InternalServerError();
			const status = err?.status || serverError.status;
			const message = err?.message || serverError.message;
			res.status(404).json({
				status,
				success: false,
				message,
			});
		});
	}
};
