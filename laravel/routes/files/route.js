const {checkAccessHook} = require("../../services/hooks");
const job = require('../../handlers/files/handler')
module.exports = function (fastify, opts, next) {
    fastify.addHook('onRequest', async (request, reply) => {
        return await checkAccessHook(request, reply);
    });

    fastify.route({
        method: 'POST',
        url: '/upload',
        schema: {
            body: {
                type: 'object',
                properties: {
                    files: {
                        type: 'array',
                        items: fastify.getSchema('MultipartFileType')
                    }
                }
            },
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        },
                        statusCode: {
                            type: 'integer'
                        }
                    }
                }
            }
        },
        async handler(request, reply) {
            const data = await job.uploadFiles(request.body, request.info)
            if (data.statusCode == 200) {
                reply.status(200)
                return data
            } else {
                reply.status(400)
                return data
            }
        }
    }) // Загрузка

    fastify.route({
        method: 'POST',
        url: '/get_all',
        schema: {
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        },
                        statusCode: {
                            type: 'integer'
                        }
                    }
                }
            }
        },
        async handler(request, reply) {
            const data = await job.getUserFiles(request.body, request.info)
            if (data.statusCode == 200) {
                reply.status(200)
                return data
            } else {
                reply.status(400)
                return data
            }
        }
    })
    next()
}