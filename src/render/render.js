/**
 * Created by june on 2017/1/23.
 */
import Client from './client';
import Events from 'events';

export default class Render extends Events {
    constructor({port}) {
        super();
        this.client = new Client({port: port});
        this.client.on('recieved', info => {
            this.emit(Render._getParsedEventName(info.template), info);
        });
    }

    parse(template, data) {
        /**
         * win
         * @type {*}
         */
        template = template.replace(/\\/g, '/');
        this.client.request(
            JSON.stringify({template, data})
        );
        return new Promise(resolve => {
            this.once(Render._getParsedEventName(template), resolve);
        });
    }

    static _getParsedEventName(tpl) {
        return `Parsed:${tpl}`
    }
}
