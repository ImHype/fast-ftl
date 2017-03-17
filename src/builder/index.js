/**
 * Created by june on 2017/1/23.
 */
import createService from './service';
import {findPort, javaVersion, error} from '../util';

export default function builder(root) {
    return javaVersion()
        .catch(e => {
            error(e);
        })
        .then(() => findPort())
        .then(port => {
            return createService(root, port).catch((e) => {
                error(e);
            }).then(() => {
                return Promise.resolve(port);
            });
        });
}
