import RenderProxy from './render';
import builder from './builder';
import Events from 'events';
import path from 'path';
import {typeOf} from './util';

class Index extends Events {
    constructor({root, paths}) {
        super();
        if (!root) {
            throw new Error("root must need");
        }

        this.viewRoot = root;

        if (paths && typeOf(paths, 'array')) {
            root = [...paths, root].join(',');
        }

        builder(root).then(this.createRender.bind(this))
    }

    createRender(port) {
        this.render = new RenderProxy({
            port
        });
        this.emit('started');
    }

    parse(template, data) {

        const tpl = path.relative(this.viewRoot, template);

        if (!this.render) {
            return new Promise(resolve => {
                this.once('started', () => {
                    resolve(this.render.parse(tpl, data));
                });
            });
        }
        return this.render.parse(tpl, data);
    }
}

export const Render = (...args) => {
    return new Index(...args);
};

export default Render;