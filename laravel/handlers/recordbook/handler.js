const {pool} = require("../../dependencies");

async function getRecordBook(object, user) {
    let data = {
        message: '',
        statusCode: 400
    }
    const client = await pool.connect()
    const userId = user.userId
    try {
        const querySelectRecordBook = `SELECT *
                                       FROM recordbooks r
                                                INNER JOIN subjects s on r."subjectId" = s."id"
                                       WHERE r."userId" = $1
                                         AND r."semestrId" = $2`
        const resSelectRecordBook = await client.query(querySelectRecordBook,
            [
                userId,
                object.semestrId
            ])
        if (resSelectRecordBook.rows.length > 0) {
            data = {
                message: resSelectRecordBook.rows[0]
            }
        } else {
            data = {
                message: 'Ошибка при получении информации о зачетке',
                statusCode: 400
            }
            console.log('Ошибка при получении информации о зачетке')
        }
    } catch (e) {
        console.log(e)
    } finally {
        client.release()
        console.log('client.release()')
    }
    return data
}

module.exports = {
    getRecordBook: getRecordBook
}