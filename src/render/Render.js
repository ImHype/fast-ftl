/**
 * Created by june on 2017/1/23.
 */
import Client from './Client';
import Events from 'events';

export default class Render extends Events{
    constructor() {
        super();
        this.client = new Client({ port: '5789'});
        this.client.on('recieved', info => {
            this.emit(Render._getParsedEventName(info.msg), info.res);
        });
    }

    parse(tpl) {
        this.client.request(tpl);
        return new Promise( resolve => {
            this.once(Render._getParsedEventName(tpl), (res) => {
                resolve(res);
            })
        });
    }

    static _getParsedEventName(tpl) {
        return `Parsed:${tpl}`
    }

}