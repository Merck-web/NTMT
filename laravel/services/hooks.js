const jwt = require('jsonwebtoken');

async function checkAccessHook(request, reply, object = {}) {
    const headers = request.headers;
    try{
        let token = headers.access;
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        request.info = decoded;
        request.access = token;

    }catch (e) {
        console.log(e)
    }
}

module.exports = {
    checkAccessHook: checkAccessHook
}