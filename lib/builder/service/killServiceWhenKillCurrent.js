module.exports = function killServiceWhenKillCurrent(service) {
    const whenExit = () => {
        



        
        try {
            service.kill('SIGHUP');
        } catch (e) {
            /* eslint-disable */

            /* eslint-enable */
        }
        
    };

    const whenSIGINT = () => {
        try {
            process.exit(0);
        } catch (e) {
            /* eslint-disable */
            
            /* eslint-enable */
        }
        whenExit();
    };

    process.on('SIGINT', whenSIGINT);
    process.on('exit', whenExit);
};
