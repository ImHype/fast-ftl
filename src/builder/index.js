/**
 * Created by june on 2017/1/23.
 */
import {spawn} from 'child_process';
import {log} from '../util';
import {resolve} from 'path';

export default class Builder {
    constructor({root}) {
        if (!root) {
            throw new Error("root must be string");
        }
        this.root = root;
    }

    build(port) {
        const jarFile = resolve(__dirname, '../../lib/Fast-FTL.jar');
        const cmd = this.cmd = spawn('java', [
            '-jar',
            jarFile,
            this.root,
            port
        ]);

        cmd.stderr.on('data', data => {
            log(data.toString());
        });

        this.bindExit();

        return new Promise(resolve => {
            cmd.stdout.on('data', data => {
                log(data);
                if (~data.indexOf('built')) {
                    setTimeout(resolve, 500);
                }
            });
        });
    }

    bindExit() {
        process.on('SIGINT', () => {
            this.cmd.kill('SIGHUP');
            log('Kill Success!');
            process.exit(0);
        });
    }
}