import Render from './render/Render';
import Builder from './builder';
import Events from 'events';
import {findPort} from './util';

class Index extends Events {
    constructor(options = {}) {
        super();
        this.options = options;
        findPort()
            .then(port => {
                return this.start(port);
            })
            .catch((err) => {
                log(`[E] ${err}`);
                process.exit(-1);
            })
            .then(() => {
                this.started = !0;
                this.emit('started');
            });
    }

    start(port) {
        this.render = new Render({
            port
        });
        return new Builder(this.options).build(port);
    }

    parse(...args) {
        if (!this.started) {
            return new Promise(resolve => {
                this.on('started', resolve);
            }).then(() => {
                return this.parseProxy(...args);
            });
        }
        return this.parseProxy(...args);
    }

    parseProxy(...args) {
        return this.render.parse(...args);
    }
}

export default (options) => {
    return new Index(options);
}