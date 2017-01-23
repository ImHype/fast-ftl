import Render from './render/Render';
import Builder from './builder';
import Events from 'events';

class Index extends Events {
    constructor(options = {}) {
        super();
        this.options = options;
        this.start().then(() => {
            this.started = !0;
            this.emit('started');
        });
    }

    start() {
        this.render = new Render();
        return new Builder(this.options).build();
    }

    parse(tpl) {
        if (!this.started) {
            return new Promise(resolve => {
                this.on('started', () => {
                    resolve();
                });
            }).then(() => {
                return this.parseProxy(tpl);
            });
        }
        return this.parseProxy(tpl);
    }

    parseProxy(tpl) {
        return this.render.parse(tpl);
    }
}

export default (options) => {
    return new Index(options);
}