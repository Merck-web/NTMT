const {pool, constants} = require('../../dependencies')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ldap = require('ldapjs')
// const ldapClient = ldap.createClient({
//     url: 'ldap://192.168.43.230:389'
// })
const eventEmmiter = require('events')
const emmiter = new eventEmmiter()

let userData

async function authenticateDn(login, password, object) {
    let data = false
    await ldapClient.bind(login, password, async (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Success')
            data = true
            return data
        }
    });
}

// function search() {
//     let data
//     var opts = {
//         filter: '(sAMAccountName=snowflake)',
//         scope: 'sub',
//         // attributes: ['dc', 'dn', 'sn', 'cn', 'sAMAccountName'],
//     };
//     ldapClient.search('dc=ntmt,dc=local', opts, function (err, res) {
//         if (err) {
//             console.log("Error in search " + err)
//         } else {
//             res.on('searchEntry', function (entry) {
//                 // console.log('entry: ' + JSON.stringify(entry.object));
//                 data = JSON.stringify(entry.object)
//                 console.log(data)
//                 return data
//             });
//             res.on('searchReference', function (referral) {
//                 console.log('referral: ' + referral.uris.join());
//             });
//             res.on('error', function (err) {
//                 console.error('error: ' + err.message);
//             });
//             res.on('end', function (result) {
//                 console.log('status: ' + result.status);
//             });
//         }
//     });
//
// }
//
// async function addUser() {
//     var newDN = "cn=new guy2,ou=USERS,ou=NTMT,dc=ntmt,dc=local";
//     var newUser = {
//         cn: 'new guy2',
//         sn: 'guy2',
//         mail: 'nguy2@example.org',
//         objectClass: ["top", "person", "organizationalPerson", "user"],
//         userPassword: 'q20047878qQ',
//         sAMAccountName: 'newguy2',
//         userPrincipalName: 'newguy2@ntmt.local'
//     }
//     ldapClient.add(newDN, newUser, (err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(res.status)
//         }
//     });
// }

async function registration(object) {
    let data = {
        message: '',
        statusCode: 400
    }
    const client = await pool.connect()
    try {
        //Проверяем, занят ли логин
        const querySelectLogin = `SELECT *
                                  FROM users
                                  WHERE login = $1`
        const resSelectLogin = await client.query(querySelectLogin,
            [
                object.login
            ])
        if (resSelectLogin.rows.length === 0) {
            await client.query('BEGIN')
            const queryInsertBios = `INSERT INTO bios ("name", "secondName", "patronomyc", "flura", "grant")
                                     VALUES ($1, $2, $3, $4, $5)
                                     RETURNING *`
            const resInsertBios = await client.query(queryInsertBios,
                [
                    object.name,
                    object.secondName,
                    object.patronomyc,
                    object.flura,
                    object.grant
                ])
            if (resInsertBios.rows.length > 0) {
                const hashPassword = bcrypt.hashSync(object.password, 5)
                const queryInsertUsers = `INSERT INTO users ("bioId", "typesId", "login", "password", "groupId")
                                          VALUES ($1, $2, $3, $4, $5)
                                          RETURNING *`
                const resInsertUsers = await client.query(queryInsertUsers,
                    [
                        resInsertBios.rows[0].id,
                        object.type,
                        object.login,
                        hashPassword,
                        object.groupId
                    ])
                if (resInsertUsers.rows.length > 0) {
                    const queryInsertUserRole = `INSERT INTO userroles ("userId", "roleId")
                                                 VALUES ($1, $2)
                                                 RETURNING *`
                    const resInsertUserRole = await client.query(queryInsertUserRole,
                        [
                            Number(resInsertUsers.rows[0].id),
                            object.role
                        ])
                    if (resInsertUserRole.rows.length > 0) {
                        await client.query('COMMIT')
                        data = {
                            message: 'success',
                            statusCode: 200
                        }
                    } else {
                        await client.query('ROLLBACK')
                        data = {
                            message: 'Ошибка при создании роли пользователя',
                            statusCode: 400
                        }
                        console.log('ERROR:Ошибка при роли пользователя')
                    }

                } else {
                    await client.query('ROLLBACK')
                    data = {
                        message: 'Ошибка при создании пользователя',
                        statusCode: 400
                    }
                    console.log('ERROR:Ошибка при создании пользователя')
                }
            } else {
                await client.query('ROLLBACK')
                console.log('ERROR:Ошибка при создании bio')
                data = {
                    message: 'Ошибка при создании bio',
                    statusCode: 400
                }
            }
        } else {
            data = {
                message: 'Пользователь с таким логином уже существует',
                statusCode: 400
            }
        }
    } catch (e) {
        console.log(e)
    } finally {
        client.release()
        console.log('client.release')
    }
    return data
}

async function login(object, reply) {
    let data = {
        message: '',
        statusCode: 400
    }

    const client = await pool.connect()
    try {
        const type = object.type
        const login = object.login
        const password = object.password
        if (type === constants.LOGIN_TYPES.activeDirectory) {
            let check = false
            // console.log(await authenticateDn('ntmt\\' + login, password));
            ldapClient.bind('ntmt\\' + `Администратор`, password, (err) => {
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
                const token = await jwt.sign({sAMAccountName: args.sAMAccountName}, process.env.PRIVATE_KEY, {
                    expiresIn: '24h'
                })
                userData = {
                    message: token,
                    statusCode: 200
                }
                await reply.send(userData)
            })
            return userData
        } else if (type === constants.LOGIN_TYPES.loginPassword) {
            const querySelectUserByLogin = `SELECT *
                                            FROM users
                                            WHERE "login" = $1`
            const resSelectUserByLogin = await client.query(querySelectUserByLogin,
                [
                    login
                ])
            if (resSelectUserByLogin.rows.length > 0) {
                const userPassword = resSelectUserByLogin.rows[0].password
                const userId = resSelectUserByLogin.rows[0].id
                const querySelectRole = `SELECT *
                                         FROM userroles
                                         WHERE "userId" = $1`
                const resSelectRole = await client.query(querySelectRole,
                    [
                        userId
                    ])
                const roleId = resSelectRole.rows[0].roleId
                if (await bcrypt.compare(password, userPassword) == true) {
                    const token = await jwt.sign({userId: userId, roleId: roleId}, process.env.PRIVATE_KEY, {
                        expiresIn: '24h'
                    })
                    reply.send({
                        message: token,
                        statusCode: 200
                    })
                    console.log(`Успешный вход для пользователя ${login}`)
                } else {
                    data = {
                        message: `Неверный пароль для пользователя: ${login}`,
                        statusCode: 400
                    }
                    console.log('Неверный пароль')
                }
            } else {
                data = {
                    message: `Пользователя с логином ${login} не существует`,
                    statusCode: 400
                }
                console.log(`Ошибка при нахождении пользователя с логином ${login}`)
            }
        } else {
            data = {
                message: `Вход типа ${type} недоступен`,
                statusCode: 400
            }
            console.log(`Вход типа ${type} недоступен`)
        }
    } catch
        (e) {
        console.log(e)
    } finally {
        client.release()
        console.log('client.release')
    }
    return data
}

module.exports = {
    registration: registration,
    login: login
}

