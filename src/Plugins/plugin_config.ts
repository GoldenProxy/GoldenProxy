import * as fs from 'fs';
import LoggerType from '../Logger';

export class Config {
    path: string;
    config: any;

    constructor(pluginname: string, plugindir: string, public logger: LoggerType) {
        this.path = plugindir + `/${pluginname.toLowerCase()}.config.json`;
        if (!fs.existsSync(this.path)) {
            this.save({})
        }
        

        this.config = JSON.parse(fs.readFileSync(this.path, 'utf-8').toString());
    }

    get(key: any) {
        return this.config[key] || null;
    }

    set(key: any, value: any) {
        this.config[key] = value;
    }

    save(conf: Object = this.config) {
        try{
            fs.writeFileSync(this.path, JSON.stringify(conf, null, 4));
        } catch(e) {
            this.logger.error(`Failed to save config for ${this.path}`);
        }
    }
}