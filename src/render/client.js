import {Socket} from 'net';
import Events from 'events';

export default class Client extends Events {
    constructor(options) {
        super();
        Object.assign(this, options);
        this.socket = this.createSocket();
    }

    createSocket() {
        const socket = new Socket();
        const recieveData = [];
        socket.on('data', msg => {
            recieveData.push(msg);
        });
        socket.on('end', () => {
            this.requestCallback(Buffer.concat(recieveData).toString());
            recieveData.length = 0;
        });
        return socket;
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
        this.socket.connect({
            host: '127.0.0.1',
            port: this.port
        }, () => {
            this.socket.end(msg);
        });
    }
}
