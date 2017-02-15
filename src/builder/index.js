/**
 * Created by june on 2017/1/23.
 */
import createService from './service';
import {findPort, javaVersion, log} from '../util';

export default function builder(root) {
    return javaVersion()
        .catch(e => {
            log(`[E] ${e}`);
            process.exit(-1);
        })
        .then(() => findPort())
        .then(port => {
            return createService(root, port).catch((e) => {
                log(`[E] ${e}`);
                process.exit(-1);
            }).then(() => {
                return Promise.resolve(port);
            });
        });
}
