import RenderProxy from './render';
import builder from './builder';
import Events from 'events';
import path from 'path';
import {typeOf} from './util';

class Index extends Events {
    constructor(options) {
        super();

        // 透传 Jar 包
        let {root, paths, defaultEncoding, URLEscapingCharset, numberFormat} = options;

        if (!root) {
            throw new Error("root must need");
        }

        this.viewRoot = root;

        if (paths) {
            if (!typeOf(paths, 'array')) {
                paths = [paths];
            }

            root = [...paths, root].join(',');
        }

        builder({root, defaultEncoding, URLEscapingCharset, numberFormat}).then(this.createRender.bind(this))
    }

    createRender(port) {
        this.render = new RenderProxy({
            port
        });
        this.emit('started');
    }

    parse(template, data) {

        // 确保绝对路径
        template = path.resolve(this.viewRoot, template);

        // 绝对路径 => 相对 viewRoot 的路径
        template = path.relative(this.viewRoot, template);

        if (!this.render) {
            return new Promise(resolve => {
                this.once('started', () => {
                    resolve(this.render.parse(template, data));
                });
            });
        }
        return this.render.parse(template, data);
    }
}

export const Render = (...args) => {
    return new Index(...args);
};

export default Render;