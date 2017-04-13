const {resolve} = require('path');
const {invokeJar} = require('../../util');
const logServiceError = require('./logServiceError');
const killServiceWhenKillCurrent = require('./killServiceWhenKillCurrent');

function serviceBuildPromise(service) {
    return new Promise(resolve => {
        service.stdout.on('data', data => {
            if (~data.indexOf('built')) {
                setTimeout(resolve, 200);
            }
        });
    });
}

function createService(options) {
    const jarFile = resolve(__dirname, '../../../jar/Fast-FTL.jar');
    return invokeJar(jarFile, [JSON.stringify(options)]);
}

/**
 * root
 * port
 */
module.exports = function (options) {
    const service = createService(options);
    killServiceWhenKillCurrent(service);
    logServiceError(service);
    return serviceBuildPromise(service);
};
