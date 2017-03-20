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

function createService(args) {
   const jarFile = resolve(__dirname, '../../../lib/Fast-FTL.jar');
    return invokeJar(jarFile, args);
}

/**
 * root
 * port
 */
export default function (...args) {
    const service = createService(args);
    killServiceWhenKillCurrent(service);
    logServiceError(service);
    return serviceBuildPromise(service);
};
