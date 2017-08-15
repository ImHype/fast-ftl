const createService = require('./service');
const {findPortExclude, javaVersion, error} = require( '../util');

module.exports = function builder(excludePort = 0, arg) {
    return javaVersion()
        .catch(e => {
            error(e);
        })
        .then(() => findPortExclude(excludePort))
        .then(port => {
            return createService(Object.assign(arg, {port})).catch((e) => {
                error(e);
            }).then(() => {
                return Promise.resolve(port);
            });
        });
};
