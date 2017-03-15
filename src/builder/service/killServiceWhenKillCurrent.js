import {log} from '../../util';
export default function killServiceWhenKillCurrent(service) {
    const exitProcess = () => {
        try {
            service.kill('SIGHUP');
            log('Kill Success!');
            process.exit(0);
        } catch (e) {
            log('[D] has exited')
        }
    };
    process.on('SIGINT', exitProcess);
    process.on('exit', exitProcess);
    process.on('uncaughtException', exitProcess);
}
