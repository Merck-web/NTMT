const {pool} = require("../../dependencies");

async function getMessages(object, user, list) {
    let data = {
        message: '',
        statusCode: 400
    }
    const client = await pool.connect()
    const userId = user.userId
    const entriesOnPage = 5;
    let listLimit = list * entriesOnPage - entriesOnPage

    try {
        const querySelectAllMessages = `SELECT *
                                        FROM usermessages um
                                                 LEFT JOIN messages m on um."messageId" = m.id
                                        WHERE "userId" = $1
                                        ORDER BY m.date DESC
                                        OFFSET $2 LIMIT $3`
        const resSelectAllMessages = await client.query(querySelectAllMessages,
            [
                userId,
                listLimit,
                entriesOnPage
            ])
        data = {
            message: resSelectAllMessages.rows,
            statusCode: 200
        }
    } catch (e) {
        console.log(e)
        data = {
            message: e,
            statusCode: 400
        }
    } finally {
        client.release()
        console.log('client.release')
    }
    return data
}

async function getInfoAboutMessage(object, user){

}
module.exports = {
    getMessages: getMessages
}