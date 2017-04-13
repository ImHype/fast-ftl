const createService = require('./service');
const {findPort, javaVersion, error} = require( '../util');

module.exports = function builder(arg) {
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
};
