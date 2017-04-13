const {warning} = require('../../util');

module.exports = function logServiceError(service) {
    service.stderr.on('data', data => {
        warning(data.toString());
    });
}
