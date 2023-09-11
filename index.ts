import logger from './src/MultiLangLogger/typescript'
import GoldenProxy from './src/proxy'
import {
    validMinecraftVersions
} from './src/types'
import Config from './src/Config'
import Plugins from './src/Plugins'
import { CommandManager } from './src/Chat'
import { GOLDENPROXY_ASCII } from './src/consts'

import path from 'path'

console.log(GOLDENPROXY_ASCII)

const log = new logger('Golden')
const commands = new CommandManager()

log.info('Starting Golden...')

const config = new Config(__dirname + '/config.json')
const proxy = new GoldenProxy(config, log, commands)
const plugins = new Plugins(log, config, proxy , commands)
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