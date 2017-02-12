import {log} from '../../util';
export default function logServiceError(service) {
    service.stderr.on('data', data => {
        log(data.toString());
    });
}
