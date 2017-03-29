/**
 * Created by june on 2017/1/23.
 */
import createService from './service';
import {findPort, javaVersion, error} from '../util';

export default function builder(arg) {
    return javaVersion()
        .catch(e => {
            error(e);
        })
        .then(() => findPort())
        .then(port => {
            return createService(Object.assign(arg, {port})).catch((e) => {
                error(e);
            }).then(() => {
                return Promise.resolve(port);
            });
        });
}
