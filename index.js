const Application = require('../project-hyper/app/server');
const DB_URL = 'mongodb://localhost:27017/Project-Hyper';
require('dotenv').config();
new Application(3010, DB_URL);
