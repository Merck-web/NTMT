const ldap = require('ldapjs')

const client = ldap.createClient({
    url:'ldap://192.168.43.230:389'
})

module.exports = {
    client:client
}