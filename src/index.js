import Render from './render/Render';
import builder from './builder';

class Index {
    constructor({root}) {
        if (!root) {
            throw new Error("root must be string");
        }
        builder(root).then(this.createRender.bind(this));
    }

    createRender(port) {
      this.render = new Render({
          port
      });
    }

    parse (...args) {
      if (!this.render) {
         return Promise.resolve({content: '不好意思哟，服务还在启动中，过一秒再来吧~'});
      }
      return this.render.parse(...args);
    }
}

export default (...args) => {
    return new Index(...args);
}
