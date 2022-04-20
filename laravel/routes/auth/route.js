const {checkAccessHook} = require("../../services/hooks");
const job = require('../../handlers/auth/handler')
module.exports = function (fastify, opts, next) {
    // fastify.addHook('onRequest', async (request, reply) => {
    //     return await checkAccessHook(request, reply);
    // });

    fastify.route({
        method: 'POST',
        url: '/registration',
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    secondName: {
                        type: 'string'
                    },
                    patronomyc: {
                        type: 'string'
                    },
                    flura: {
                        type: 'string'
                    },
                    grant: {
                        type: 'integer'
                    },
                    type: {
                        type: 'integer'
                    },
                    groupId: {
                        type: 'integer'
                    },
                    login:{
                        type:'string'
                    },
                    password:{
                        type:'string'
                    }
                },
                required: ["name", "secondName", "patronomyc"]
            }
        },
        async handler(request, reply) {
            const data = await job.registration(request.body,request.info)
            if(data.statusCode === 200){
                reply.status(200)
                return data
            }else{
                reply.status(400)
                return data
            }
        }
    })

    next()
}