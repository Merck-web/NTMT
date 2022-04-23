require('dotenv').config()
const pgpool = require('./services/libs/pgpool')
const constants = require('./services/constants')
// const client = require('./services/libs/ldap')
module.exports = {
    pool: pgpool.pool,
    constants: constants,
    // client: client
}