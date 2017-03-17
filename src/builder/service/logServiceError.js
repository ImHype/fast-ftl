import {warning} from '../../util';
export default function logServiceError(service) {
    service.stderr.on('data', data => {
        warning(data.toString());
    });
}
