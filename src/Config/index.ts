import path from 'path'
import {
    validConfig,
    validMinecraftVersions,
    validConfigArray,
} from '../types'

export default class Config {

    config: validConfig
    connection_port: number
    connection_version: validMinecraftVersions
    server_host: string
    server_port: number
    server_version: validMinecraftVersions
    enable_example_plugin: boolean

    constructor(path: string) {
        this.config = require(path)

        this.connection_port = this.config.connection_port
        this.connection_version = this.config.connection_version
        this.server_host = this.config.server_host
        this.server_port = this.config.server_port
        this.server_version = this.config.server_version
        this.enable_example_plugin = this.config.enable_example_plugin


    
    }
}