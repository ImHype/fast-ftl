/**
 * Created by june on 2017/1/23.
 */
import createService from './service';
import {findPort} from '../util';

export default function builder(root) {
    return findPort().then(port => {
        return createService(root, port).catch((err) => {
            log(`[E] ${err}`);
            process.exit(-1);
        }).then(() => {
            return Promise.resolve(port);
        });
    });
}
