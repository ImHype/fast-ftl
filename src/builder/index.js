/**
 * Created by june on 2017/1/23.
 */
import {spawn} from 'child_process';

export default class Builder {
    constructor({root, port}) {
        this.root = root;
        this.port = port;
        this.bindExit();
    }
    build() {
        const cmd = this.cmd = spawn('java', [
            '-jar',
            '/Users/june/Desktop/Projects/global-online/Fast-FTL/out/artifacts/Fast_FTL_jar/Fast-FTL.jar',
            this.root || '/Users/june/Desktop/Projects/kaola/haitaowap/src/main/webapp/WEB-INF/template',
        ]);

        return new Promise(resolve => {
            cmd.stdout.on('data', (data) => {
                if (~data.indexOf('success')) {
                    resolve();
                } else {
                    console.log(data.toString());
                }
            });
        });
    }
    bindExit() {
        process.on('SIGINT', () => {
            this.cmd.kill('SIGHUP');
            console.log('[I] killed fast-ftl!');
            process.exit(0);
        });
    }
}