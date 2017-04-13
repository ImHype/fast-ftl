const {log} = require('../../util');

module.exports = function killServiceWhenKillCurrent(service) {
    const whenExit = () => {
        try {
            service.kill('SIGHUP');
        } catch (e) {}
    };

    const whenSIGINT = () => {
        try {
            process.exit(0);
        } catch (e) {}
        whenExit();
    };

    process.on('SIGINT', whenSIGINT);
    process.on('exit', whenExit);
}
