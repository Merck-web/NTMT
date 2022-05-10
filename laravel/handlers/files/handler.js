const {filesystem, pool, constants} = require('../../dependencies');

async function uploadFiles(object, user) {
    let data = {
        message: '',
        statusCode: 400
    }
    const client = await pool.connect()
    let uploadsFiles = []
    try {
        console.log(object.files.length)
        const queryInsertFiles = `INSERT INTO files ("userId", "fileType", "filePath", "fileMeta")
                                  VALUES ($1, $2, $3, $4)
                                  RETURNING *`
        for (let i = 0; i < object.files.length; i++) {
            const upload = filesystem.uploadFile(filesystem.userFiles, object.files[i], {
                customStr: "u" + user.userId,
                customMIME: constants.MIME_IMAGES
            })
            const resInsertFiles = await client.query(queryInsertFiles,
                [
                    user.userId,
                    constants.FILE_TYPES[".txt"],
                    upload.path,
                    {}
                ])
            uploadsFiles.push(resInsertFiles.rows[0])
        }
        if (uploadsFiles.length != 0) {
            data = {
                message: uploadsFiles,
                statusCode: 200
            }
        } else {
            data = {
                message: 'ОШИБОЧКА',
                statusCode: 228
            }
        }
    } catch (e) {
        data = {
            message: e.message,
            statusCode: 400
        }
    } finally {
        client.release()
    }
    return data
}

async function getUserFiles(object, user) {
    let data = {
        message: '',
        statusCode: 400
    }
    const client = await pool.connect()
    try {
        const querySelectFiles = `SELECT *
                                  FROM files
                                  WHERE "userId" = $1`
        const resSelectFiles = await client.query(querySelectFiles,
            [
                user.userId
            ])
        if (resSelectFiles.rows.length > 0) {
            data = {
                message: resSelectFiles.rows,
                statusCode: 200
            }
        } else {
            data = {
                message: 'У данного пользователя нет файлов',
                statusCode: 400
            }
        }
    } catch (e) {
        data = {
            message: e.message,
            statusCode: 400
        }
    }
    return data
}

module.exports = {
    uploadFiles: uploadFiles,
    getUserFiles: getUserFiles
}