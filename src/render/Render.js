/**
 * Created by june on 2017/1/23.
 */
import Client from './Client';
import Events from 'events';

export default class Render extends Events{
    constructor({port}) {
        super();
        this.client = new Client({ port: port || '5789'});
        this.client.on('recieved', info => {
            this.emit(Render._getParsedEventName(info.template), info);
        });
    }

    parse(template, data) {
        data = JSON.stringify({template, data});
        this.client.request(data);
        return new Promise( resolve => {
            this.once(Render._getParsedEventName(template), resolve);
        });
    }

    static _getParsedEventName(tpl) {
        return `Parsed:${tpl}`
    }
}
