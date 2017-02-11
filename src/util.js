/**
 * Created by june on 2017/1/27.
 */
import portfinder from 'portfinder';
import {spawn} from 'child_process';
const isDev = process.env.NODE_ENV === 'development';

function log(data) {
    if (!isDev && (!~data.indexOf('[E]'))) {
        return -1;
    }
    console.log(data.toString('UTF-8').replace(/\n/, ''));
    return 0;
}

function findPort() {
    return new Promise((resolve, reject)=>{
        portfinder
            .getPort(function (err, port) {
                if (err) {
                    return reject(err);
                }
                resolve(port);
            });
    })
}

/**
*/
function invokeJar(jarFile, args) {
  return spawn('java', [
      '-jar', ...[jarFile, ...args]
  ]);
}
export {
    log,
    findPort,
    invokeJar
}
