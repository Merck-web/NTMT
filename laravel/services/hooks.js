const jwt = require('jsonwebtoken');

async function checkAccessHook(request) {
    const headers = request.headers;
    try {
        let token = headers.access;
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        return decoded

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    checkAccessHook: checkAccessHook
}