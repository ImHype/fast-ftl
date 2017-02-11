import {Socket} from 'net';
import Events from 'events';

export default class Client extends Events {
    constructor(options) {
        super();
        this.init(options);
        /**
         * 拥塞控制 len = 1
         * @type {boolean}
         */
        this.msgQueue = [];
    }

    init(options) {
        /**
         * @property port
         */
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
        /**
         * 返回上一条 信息
         * @type {*}
         */
        const msg = this.msgQueue.shift();
        this.emit('recieved', JSON.parse(res));

        /**
         * 发送下一条 信息
         * @type {*}
         */
        const nextMsg = this.msgQueue[0];
        if (!nextMsg) {
            return !!0;
        }
        this.requestProxy({msg: nextMsg});
    }

    request(msg) {
        this.msgQueue.push(msg);
        if (this.msgQueue.length <= 1) {
            this.requestProxy({
                msg
            });
        }
    }

    requestProxy({msg}) {
        this.socket.connect({
            host: '127.0.0.1',
            port: this.port
        }, () => {
            this.socket.end(msg);
        });
    }
}
