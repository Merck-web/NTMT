const {pool} = require('../../dependencies')
const bcrypt = require('bcryptjs')

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
                    console.log('ERROR:Ошибка при создании пользователя')
                }
            } else {
                await client.query('ROLLBACK')
                console.log('ERROR:Ошибка при создании bio')
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

module.exports = {
    registration: registration
}