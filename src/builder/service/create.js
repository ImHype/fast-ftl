import {resolve} from 'path';
import {invokeJar, log, greeting} from '../../util';
import logServiceError from './logServiceError';
import killServiceWhenKillCurrent from './killServiceWhenKillCurrent';

function serviceBuildPromise(service) {
    return new Promise(resolve => {
        service.stdout.on('data', data => {
            if (~data.indexOf('built')) {
                setTimeout(()=>{
                    resolve();
                }, 200);
            }
        });
    });
}

function createService(options) {
    const jarFile = resolve(__dirname, '../../../lib/Fast-FTL.jar');
    // console.log(options)
    return invokeJar(jarFile, [options]);
}

/**
 * root
 * port
 */
export default function (options) {
    const service = createService(JSON.stringify(options));
    killServiceWhenKillCurrent(service);
    logServiceError(service);
    return serviceBuildPromise(service);
};
