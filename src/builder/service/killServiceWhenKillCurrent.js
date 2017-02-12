import {log} from '../../util';
export default function killServiceWhenKillCurrent(service) {
    process.on('SIGINT', () => {
        try {
            service.kill('SIGHUP');
            log('Kill Success!');
            process.exit(0);
        } catch (e) {
            log('[D] has exited')
        }
    });
}
