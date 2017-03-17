import {log} from '../../util';

export default function killServiceWhenKillCurrent(service) {
    const whenExit = () => {
        log('See u again!');
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
