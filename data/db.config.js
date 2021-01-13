const knex = require('knex');
const config = require('../knexfile');
exports = knex(config.development);