import logger from './src/Logger'
import GoldenProxy from './src/proxy'
import {
    validMinecraftVersions
} from './src/types'
import Config from './src/Config'
import Plugins from './src/Plugins'

import path from 'path'


const log = new logger('Golden')

log.info('Starting Golden...')

const config = new Config(__dirname + '/config.json')
const proxy = new GoldenProxy(config, log)
const plugins = new Plugins(log, config, proxy)
proxy.plugins = plugins

process.stdout.write('> ');
process.stdin.on("data", async (data) => {

    try {
        var evaled = await eval(data.toString().trim())
        console.log(evaled);
    } catch (e) {
        console.log(e)
    }

    process.stdout.write('> ');
})