const path = require('path');
const autoload = require('fastify-autoload');
const fastify = require('fastify')({
    logger: true,
});
fastify.register(autoload, {
    dir: path.join(__dirname, './routes'),
});
fastify.register(require('fastify-routes'))


fastify.listen(3001, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})


