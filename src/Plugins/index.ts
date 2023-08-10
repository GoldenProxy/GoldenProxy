import path from 'path'
import Logger from '../MultiLangLogger/typescript'
import Config from '../Config'
import Events from '../Events'
import GoldenProxy from '../proxy'
import { ChatLogger, CommandManager, colourify } from '../Chat'
import { Config as PluginConfig } from './plugin_config'

import fs from 'fs'

export default class Plugins {
    cwd: string
    plugins: {
        name: string,
        manifest: {
            Name: string,
            ID: string,
            Version: string,
            Main: string
        }
        path: string,
        module_raw: any,
        module?: any
    }[] = []

    constructor(public logger: Logger, public config: Config, public proxy: GoldenProxy, public commandsManager: CommandManager) {
        this.cwd = process.cwd()
        
        this.loadPlugins()
    }

    loadPlugins() {
        const plugin_dir = path.join(this.cwd, 'plugins')
        if (!fs.existsSync(plugin_dir)) 
            return this.logger.info('No plugins directory found')

        const plugins = fs.readdirSync(plugin_dir)
        for (const plugin of plugins) {
            const manifest_path = path.join(plugin_dir, plugin, `${plugin}.golden.json`)
            if (!fs.existsSync(manifest_path)) {
                this.logger.warn(`No manifest.json found for ${plugin}`)
                continue
            }

            const manifest = JSON.parse(fs.readFileSync(manifest_path).toString())
            if (!manifest.Name || !manifest.ID || !manifest.Version || !manifest.Main) {
                this.logger.warn(`Invalid manifest.json for ${plugin}`)
                continue
            }
            
            let manifest_entry_var = manifest.Main.split('::')[1]
            let manifest_entry_path = manifest.Main.split('::')[0]

            const plugin_path = path.join(plugin_dir, plugin, manifest_entry_path)
            if (!fs.existsSync(plugin_path)) {
                this.logger.warn(`No main file found for ${plugin}`)
                continue
            }
            
            var plugin_module = require(plugin_path)
            
            var plugin_entry = manifest_entry_var == 'default' ? plugin_module : plugin_module[manifest_entry_var]

            if (!plugin_entry) {
                this.logger.warn(`No main entry found for ${plugin}`)
                continue
            }

            this.plugins.push({
                name: manifest.Name,
                path: plugin_path,
                manifest: manifest,
                module_raw: plugin_entry
            })
        }

        this.initPlugins()
    }

    initPlugins() {
        for (const pi in this.plugins) {
            const plugin = this.plugins[pi]
            const log = new Logger(plugin.name)

            let write = (msg: string, params: any) => {
                this.proxy.client?.write.bind(this.proxy.client)(msg, params)
            }

            const module = new plugin.module_raw(
                log,
                this.config,
                /*api:*/ {
                    events: Events,
                    proxy: this.proxy,
                    chatlog: new ChatLogger(plugin.name, write),
                    commands: {
                        register: this.commandsManager.register_command.bind(this.commandsManager),
                        unregister: this.commandsManager.unregister_command.bind(this.commandsManager),
                        check: this.commandsManager.check_command.bind(this.commandsManager),
                    },
                    util: {
                        colourify: colourify
                    },
                    config: new PluginConfig(plugin.name, path.join(this.cwd, 'plugins', plugin.name), log)
                }
            )

            this.plugins[pi].module = module
        
        }
    }
}