require('dotenv').config()
const pgpool = require('./services/libs/pgpool')
const constants = require('./services/constants')

module.exports = {
    pool: pgpool.pool,
    constants: constants
}