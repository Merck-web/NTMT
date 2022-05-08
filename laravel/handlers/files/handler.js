const {filesystem, pool, constants} = require('../../dependencies');

async function uploadFiles(object, user) {
    let data = {
        message: '',
        statusCode: 400
    }
    const funcName = "uploadFiles"
    const client = await pool.connect()
    let uploadsFiles = []
    try {
        const queryInsertFiles = `INSERT INTO files ("userId", "fileType", "filePath", "fileMeta")
                                  VALUES ($1, $2, $3, $4)
                                  RETURNING *`
        for (let i = 0; i < object.files.length; i++) {
            const upload = filesystem.uploadFiles(filesystem.userFiles, object.files[i], {
                customStr: `u ${user.userId} date ${(new Date).getTime()}`
            })
            const resInsertFiles = await client.query(queryInsertFiles,
                [
                    user.userId,
                    constants.FILE_TYPES["1"],
                    upload.path,
                    {}
                ])
            uploadsFiles.push(resInsertFiles.rows[0])
        }
        if(uploadsFiles.length != 0){
            data = {
                message: uploadsFiles,
                statusCode: 200
            }
        }else{

        }
    } catch (e) {

    } finally {
        client.release()
    }
    return data
}

module.exports = {
    uploadFiles: uploadFiles
}