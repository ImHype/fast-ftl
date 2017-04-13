const RenderProxy = require( './render');
const builder = require( './builder');
const Events = require( 'events');
const path = require( 'path');
const {typeOf} = require( './util');

class Index extends Events {
    constructor(options) {
        super();

        // 透传 Jar 包
        let {root, paths, defaultEncoding, URLEscapingCharset, numberFormat, templateUpdateDelay} = options;

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

        builder({root, defaultEncoding, URLEscapingCharset, numberFormat, templateUpdateDelay}).then(this.createRender.bind(this))
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
const Render = function (...args) {
    return new Index(...args);
}

exports = module.exports = Render;

exports.Render = Render;