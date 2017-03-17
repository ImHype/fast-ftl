/**
 * Created by june on 2017/1/27.
 */
import portfinder from 'portfinder';
import {spawn, execFile} from 'child_process';
import Logger from 'chalklog';

const _log = new Logger('fast-ftl');
const isDev = process.env.NODE_ENV === 'development';

export function log(data) {
    const output = data.toString('UTF-8').replace(/[.\n]+/,'');

    if ((~data.indexOf('[D]'))) {
        _log.blue(output);
        return -1;
    }

    if (/^\s*$/g.test(output)) {
        return -1
    }

    _log.green(output);
}

export function error(msg) {
    _log.red(msg);
    process.exit(1);
}

export function warning(msg) {
    _log.yellow(msg);
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