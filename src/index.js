import Render from './render';
import builder from './builder';
import Events from 'events';

class Index extends Events {
    constructor({root}) {
        super();
        if (!root) {
            throw new Error("root must be string");
        }
        builder(root)
            .then(this.createRender.bind(this))
    }

    createRender(port) {
        this.render = new Render({
            port
        });
        this.emit('started');
    }

    parse(...args) {
        if (!this.render) {
            return new Promise(resolve => {
                this.once('started', () => {
                    resolve(this.render.parse(...args));
                });
            });
        }
        return this.render.parse(...args);
    }
}

export default (...args) => {
    return new Index(...args);
}
