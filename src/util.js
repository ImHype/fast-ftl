/**
 * Created by june on 2017/1/27.
 */
import portfinder from 'portfinder';
import {spawn, execFile} from 'child_process';

const isDev = process.env.NODE_ENV === 'development';

export function log(data) {
    if (!isDev && (~data.indexOf('[D]'))) {
        return -1;
    }
    const output = data.toString('UTF-8').replace(/[.\n]+/,'');

    if (/^\s*$/g.test(output)) {
        return -1
    }
    console.log(`[fast-ftl] ${output}`);
    return 0;
}

export function findPort() {
    return new Promise((resolve, reject) => {
        portfinder
            .getPort(function (err, port) {
                if (err) {
                    return reject(err);
                }
                resolve(port);
            });
    })
}


export function invokeJar(jarFile, args) {
    return spawn('java', [
        '-jar', ...[jarFile, ...args]
    ]);
}

export function javaVersion() {
    return new Promise((resolve, reject) => {
        execFile('java', ['-version'], (e, result) => {
            if (e)
                return reject(e);

            resolve(result || 'Java Has Installed');
        });
    })
}

export function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}