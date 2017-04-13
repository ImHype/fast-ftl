const {Socket} = require('net');
const Events = require( 'events');

module.exports = class Client extends Events {
    constructor(options) {
        super();
        Object.assign(this, options);
    }

    createSocket() {
        const host = '127.0.0.1';
        const port = this.port;
        const socket = new Socket();
        const recieveData = [];

        socket.on('data', msg => {
            recieveData.push(msg);
        });

        socket.on('end', () => {
            this.requestCallback(Buffer.concat(recieveData).toString());
            recieveData.length = 0;
        });

        return new Promise(resolve => {
            socket.connect({host, port}, () => resolve(socket));
        });
    }

    requestCallback(res) {
        let resJSON;
        try {
            resJSON = JSON.parse(res);
        } catch (e) {
            resJSON = {content: ''};
        }
        this.emit('recieved', resJSON);
    }

    request(msg) {
        this.createSocket()
            .then((socket) => {
                socket.end(msg);
            });
    }
};
