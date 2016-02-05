let Hapi = require('hapi');
let debug = require('debug')('server');

const PORT = 3000;

let server = new Hapi.Server();
server.connection({ port: PORT });

server.register(require('inert'), function (err) {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: __dirname + '/examples/',
                index: true
            }
        }
    });

    server.start(err => {
        if (err) {
            debug('unable to start server', err);
            throw err;
        }

        debug('webserver started', {
            protocol: server.info.protocol,
            address: server.info.address,
            port: PORT
        });
    });
});
