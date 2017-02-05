/**
 * Created by june on 2017/1/27.
 */
import portfinder from 'portfinder';

const isDev = process.env.NODE_ENV === 'development';
const log = (data) => {
    if (!isDev && (~data.indexOf('[D]'))) {
        return -1;
    }
    console.log(data.toString('UTF-8').replace(/\n/, ''));
    return 0;
};

const findPort = () => {
    return new Promise((resolve, reject)=>{
        portfinder
            .getPort(function (err, port) {
                if (err) {
                    return reject(err);
                }
                resolve(port);
            });
    })
};

export {
    log,
    findPort
}