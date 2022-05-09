const ldap = require("ldapjs");
const eventEmmiter = require('events')
const jwt = require("jsonwebtoken");
const emmiter = new eventEmmiter()
const ldapClient = ldap.createClient({
    url: 'ldap://192.168.43.230:389'
})
const getSchedule = require('../../services/libs/excelparser')

async function getUserSchedule(object, user, reply) {
    let data = {
        message: '',
        statusCode: 400
    }
    try {
        let login = user.sAMAccountName
        ldapClient.bind('ntmt\\' + `Администратор`, 'q20047878qQ', (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Success')
                check = true
            }
            console.log(check)
            if (check == true) {
                var opts = {
                    filter: `(sAMAccountName=${login})`,
                    scope: 'sub',
                    // attributes: ['dc', 'dn', 'sn', 'cn', 'sAMAccountName'],
                };
                ldapClient.search('dc=ntmt,dc=local', opts, function (err, res) {
                    if (err) {
                        console.log("Error in search " + err)
                    } else {
                        res.on('searchEntry', function (entry) {
                            // console.log('entry: ' + JSON.stringify(entry.object));
                            emmiter.emit('searchEntry', entry.object, reply)
                        });
                        res.on('error', function (err) {
                            console.error('error: ' + err.message);
                        });
                    }
                });
            } else {
                //todo ошибка при авторизации
            }
        });
        emmiter.on('searchEntry', async (args, reply) => {
            console.log(args)
            await getSchedule.getSchedule(args.department, object.fileName, reply)
        })
    } catch (e) {
        data = {
            message: e.message,
            statusCode: 400
        }
        return data
    }
}

module.exports = {
    getUserSchedule: getUserSchedule
}