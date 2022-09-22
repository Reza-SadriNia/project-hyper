const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function crypto(str) {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(str, salt);
}

const hash = crypto('hello');

function decrypt(payload, hashString) {
	return bcrypt.compareSync(payload, hashString);
}

console.log(decrypt('hello', hash));

function tokenGenerator(payload) {
	const token = jwt.sign(payload, process.env.KEY);
	return token;
}

console.log(tokenGenerator('hello'));
