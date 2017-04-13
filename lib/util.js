/**
 * Created by june on 2017/1/27.
 */
const portfinder = require( 'portfinder');
const {spawn, execFile} = require( 'child_process');
const Logger = require( 'chalklog');
const _log = new Logger('fast-ftl');

exports.log = function log(data) {
    const output = data.toString('UTF-8').replace(/[.\n]+/,'');
    if (/^\s*$/g.test(output)) {
        return -1;
    }

    _log.green(output);
};

exports.error = function error(msg) {
    _log.red(msg);
    process.exit(1);
};

exports.warning = function warning(msg) {
    _log.red(msg);
};

exports.findPort = function findPort() {
    return portfinder.getPorts();
};

exports.findPorts = function findPorts(count = 2) {
    return new Promise((resolve, reject) => {
        portfinder
            .getPorts(count, {}, function (err, port) {
                if (err) {
                    return reject(err);
                }
                resolve(port);
            });
    });
};

exports.findPortExclude = function findPortsExclude (excludePort) {
    return exports.findPorts().then((ports) => {
        return Promise.resolve(ports.filter(function (port) {
            return Number(port) !== Number(excludePort);
        })[0]);
    });
};

exports.invokeJar = function invokeJar(jarFile, args) {
    return spawn('java', [
        '-jar', ...[jarFile, ...args]
    ]);
};

exports.javaVersion = function javaVersion() {
    return new Promise((resolve, reject) => {
        execFile('java', ['-version'], (e, result) => {
            if (e)
                return reject(e);

            resolve(result || 'Java Has Installed');
        });
    });
};

exports.typeOf = function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};