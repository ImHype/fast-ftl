import {Socket} from 'net';

export default class Client {
  constructor (port) {
    this.socket = new Socket();
    this.init();
  }

  init() {
    let data = [];
    this.socket.on('data', msg => {
      data.push(msg);
    });

    this.socket.on('end', () => {
      const content = data.join('');
      console.log(content);
      data.length = 0;
    });

    this.socket.connect('localhost', '5789', (...args) => {
      console.log(args);
    });

    this.socket.write('test.ftl');
  }
}
