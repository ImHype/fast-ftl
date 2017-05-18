/**
 * Created by june on 2017/1/23.
 */
const Client = require( './client');
const Events = require( 'events');
const crypto = require('crypto');
const {warning} = require( '../util');

const eventBus = new Events();
eventBus.setMaxListeners(0);

module.exports = class Render extends Events {
    constructor({port}) {
        super();

        this.client = new Client({port: port});
        this.client.on('recieved', info => {
            const {signture} = info;
            if (signture) {
                eventBus.emit(signture, info);
            }
        });
    }

    parse(template, data) {
        template = template.replace(/\\/g, '/');

        const signture = Render._getParseSignture(JSON.stringify({template, data}));

        this.client.request(JSON.stringify({template, data, signture}));

        return new Promise((resolve, reject) => {
            const fn = ({error, content}) => {
                eventBus.removeListener(signture, fn);

                if (error) {
                    warning(error);
                    return reject(error);
                }

                resolve(content || '');
            };
            eventBus.on(signture, fn);
        });
    }

    static _getParseSignture(text) {
        return crypto.createHash('md5').update(text, 'utf-8').digest('hex');
    }
};
