const {checkAccessHook} = require("../../services/hooks");
const job = require('../../handlers/schedule/handler')
module.exports = function (fastify, opts, next) {
    fastify.addHook('onRequest', async (request, reply) => {
        return await checkAccessHook(request, reply);
    });

    fastify.route({
        method: 'POST',
        url: '/get_schedule',
        schema: {
            body: {
                type: 'object',
                properties: {
                    files: {
                        type: 'array',
                        properties: {
                            fileName: {type: 'string'}
                        }
                    }
                }
            },
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: {type: 'string'},
                        statusCode: {type: 'integer'}
                    }
                }
            }
        },
        async handler(request, reply) {
            const data = await job.getUserSchedule(request.body, request.info, reply)
            return data
        }
    })
    next()
}