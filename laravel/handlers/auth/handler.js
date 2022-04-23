const {pool, constants} = require('../../dependencies')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
                    await client.query('COMMIT')
                    data = {
                        message: 'success',
                        statusCode: 200
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

async function login(object) {
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
            // client.on('connect', () => {
            //     console.log('Успешно подлючились к серверу')
            // })
            // const opts = `(&(username=${login},password=${password}))`
            // client.search('dc=NTMT', opts, (err, res) => {
            //     if (err) {
            //         console.log(err)
            //     } else {
            //         res.on('searchRequest', (searchRequest) => {
            //             console.log('searchRequest: ', searchRequest.messageID);
            //         });
            //         res.on('searchEntry', (entry) => {
            //             console.log('entry: ' + JSON.stringify(entry.object));
            //         });
            //         res.on('searchReference', (referral) => {
            //             console.log('referral: ' + referral.uris.join());
            //         });
            //         res.on('error', (err) => {
            //             console.error('error: ' + err.message);
            //         });
            //         res.on('end', (result) => {
            //             console.log('result: ' + result);
            //         });
            //     }
            // })
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
                if (await bcrypt.compare(password, userPassword) == true) {
                    const token = await jwt.sign({userId: userId}, process.env.PRIVATE_KEY, {
                        expiresIn: '24h'
                    })
                    data = {
                        message: token,
                        statusCode: 200
                    }
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
    } catch (e) {
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