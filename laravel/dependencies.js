require('dotenv').config()
const pgpool = require('./services/libs/pgpool')
const constants = require('./services/constants')
const ldapClient = require('./services/libs/ldap')

module.exports = {
    pool: pgpool.pool,
    constants: constants,
    ldapClient: ldapClient
}