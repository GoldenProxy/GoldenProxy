import logger from './src/Logger'
import GoldenProxy from './src/proxy'
import {
    validMinecraftVersions
} from './src/types'
import Config from './src/Config'

import path from 'path'


const log = new logger('Golden')

log.info('Starting Golden...')

const proxy = new GoldenProxy(new Config(__dirname + '/config.json'), log)

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