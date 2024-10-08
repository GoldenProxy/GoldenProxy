import EventEmitter from "events";
import mc from 'minecraft-protocol'
import chalk from 'chalk';

// Taken from node_modules\minecraft-protocol/.github/workflows\ci.yml:
export type validMinecraftVersions = '1.20.1' | '1.20' | '1.19.4' | '23w03a' | '1.19.3' | '1.19.3-rc3' | '1.19.3-rc2' | '1.19.3-rc1' | '1.19.3-pre3' | '1.19.3-pre2' | '1.19.3-pre1' | '22w46a' | '22w45a' | '22w44a' | '22w43a' | '22w42a' | '1.19.2' | '1.19.2-rc2' | '1.19.2-rc1' | '1.19.1' | '1.19.1-rc3' | '1.19.1-rc2' | '1.19.1-pre6' | '1.19.1-pre5' | '1.19.1-pre4' | '1.19.1-pre3' | '1.19.1-pre2' | '1.19.1-rc1' | '1.19.1-pre1' | '22w24a' | '1.19' | '1.19-rc2' | '1.19-rc1' | '1.19-pre5' | '1.19-pre4' | '1.19-pre3' | '1.19-pre2' | '1.19-pre1' | '22w19a' | '22w18a' | '22w17a' | '22w16b' | '22w16a' | '22w15a' | '22w14a' | '22w13oneblockatatime' | '22w13a' | '22w12a' | '22w11a' | '1.18.2' | '1.18.2-rc1' | '1.18.2-pre3' | '1.18.2-pre2' | '1.18.2-pre1' | '22w07a' | '22w06a' | '22w05a' | '22w03a' | '1.18.1' | '1.18.1-rc3' | '1.18.1-rc2' | '1.18.1-rc1' | '1.18.1-pre1' | '1.18' | '1.18-rc4' | '1.18-rc3' | '1.18-rc2' | '1.18-rc1' | '1.18-pre8' | '1.18-pre7' | '1.18-pre6' | '1.18-pre5' | '1.18-pre4' | '1.18-pre3' | '1.18-pre2' | '1.18-pre1' | '21w44a' | '21w43a' | '21w42a' | '21w41a' | '21w40a' | '21w39a' | '21w38a' | '21w37a' | '1.17.1' | '1.17.1-rc2' | '1.17.1-rc1' | '1.17.1-pre3' | '1.17.1-pre2' | '1.17.1-pre1' | '1.17' | '1.17-rc2' | '1.17-rc1' | '1.17-pre5' | '1.17-pre4' | '1.17-pre3' | '1.17-pre2' | '1.17-pre1' | '21w20a' | '21w19a' | '21w18a' | '21w17a' | '21w16a' | '21w15a' | '21w14a' | '21w13a' | '21w11a' | '21w10a' | '21w08b' | '21w08a' | '21w07a' | '21w06a' | '21w05b' | '21w05a' | '21w03a' | '1.16.5' | '1.16.5-rc1' | '20w51a' | '20w49a' | '20w48a' | '20w46a' | '20w45a' | '1.16.4' | '1.16.4-rc1' | '1.16.4-pre2' | '1.16.4-pre1' | '1.16.3' | '1.16.3-rc1' | '1.16.2' | '1.16.2-rc2' | '1.16.2-rc1' | '1.16.2-pre3' | '1.16.2-pre2' | '1.16.2-pre1' | '20w30a' | '20w29a' | '20w28a' | '20w27a' | '1.16.1' | '1.16' | '1.16-rc1' | '1.16-pre8' | '1.16-pre7' | '1.16-pre6' | '1.16-pre5' | '1.16-pre4' | '1.16-pre3' | '1.16-pre2' | '1.16-pre1' | '20w22a' | '20w21a' | '20w20b' | '20w20a' | '20w19a' | '20w18a' | '20w17a' | '20w16a' | '20w15a' | '20w14a' | '20w14infinite' | '20w13b' | '20w13a' | '20w12a' | '20w11a' | '20w10a' | '20w09a' | '20w08a' | '20w07a' | '20w06a' | '1.15.2' | '1.15.2-pre2' | '1.15.2-pre1' | '1.15.1' | '1.15.1-pre1' | '1.15' | '1.15-pre7' | '1.15-pre6' | '1.15-pre5' | '1.15-pre4' | '1.15-pre3' | '1.15-pre2' | '1.15-pre1' | '19w46b' | '19w46a' | '19w45b' | '19w45a' | '19w44a' | '19w42a' | '19w41a' | '19w40a' | '19w39a' | '19w38b' | '19w38a' | '19w37a' | '19w36a' | '19w35a' | '19w34a' | '1.14.4' | '1.14.4-pre7' | '1.14.4-pre6' | '1.14.4-pre5' | '1.14.4-pre4' | '1.14.4-pre3' | '1.14.4-pre2' | '1.14.4-pre1' | '1.14.3' | '1.14.3-pre4' | '1.14.3-pre3' | '1.14.3-pre2' | '1.14.3-pre1' | '1.14.2' | '1.14.2-pre4' | '1.14.2-pre3' | '1.14.2-pre2' | '1.14.2-pre1' | '1.14.1' | '1.14.1-pre2' | '1.14.1-pre1' | '1.14' | '1.14-pre5' | '1.14-pre4' | '1.14-pre3' | '1.14-pre2' | '1.14-pre1' | '19w14b' | '19w14a' | '19w13b' | '19w13a' | '19w12b' | '19w12a' | '19w11b' | '19w11a' | '19w09a' | '19w08b' | '19w08a' | '19w07a' | '19w06a' | '19w05a' | '19w04b' | '19w04a' | '19w03c' | '19w03b' | '19w03a' | '19w02a' | '18w50a' | '18w49a' | '18w48b' | '18w48a' | '18w47b' | '18w47a' | '18w46a' | '18w45a' | '18w44a' | '18w43c' | '18w43b' | '18w43a' | '1.13.2' | '1.13.2-pre2' | '1.13.2-pre1' | '1.13.1' | '1.13.1-pre2' | '1.13.1-pre1' | '18w33a' | '18w32a' | '18w31a' | '18w30b' | '18w30a' | '1.13' | '1.13-pre10' | '1.13-pre9' | '1.13-pre8' | '1.13-pre7' | '1.13-pre6' | '1.13-pre5' | '1.13-pre4' | '1.13-pre3' | '1.13-pre2' | '1.13-pre1' | '18w22c' | '18w22b' | '18w22a' | '18w21b' | '18w21a' | '18w20c' | '18w20b' | '18w20a' | '18w19b' | '18w19a' | '18w16a' | '18w15a' | '18w14b' | '18w14a' | '18w11a' | '18w10d' | '18w10c' | '18w10b' | '18w10a' | '18w09a' | '18w08b' | '18w08a' | '18w07c' | '18w07b' | '18w07a' | '18w06a' | '18w05a' | '18w03b' | '18w03a' | '18w02a' | '18w01a' | '17w50a' | '17w49b' | '17w49a' | '17w48a' | '17w47b' | '17w47a' | '17w46a' | '17w45b' | '17w45a' | '17w43b' | '17w43a' | '1.12.2' | '1.12.2-pre2' | '1.12.2-pre1' | '1.12.1' | '1.12.1-pre1' | '17w31a' | '1.12' | '1.12-pre7' | '1.12-pre6' | '1.12-pre5' | '1.12-pre4' | '1.12-pre3' | '1.12-pre2' | '1.12-pre1' | '17w18b' | '17w18a' | '17w17b' | '17w17a' | '17w16b' | '17w16a' | '17w15a' | '17w14a' | '17w13b' | '17w13a' | '17w06a' | '1.11.2' | '1.11.1' | '16w50a' | '1.11' | '1.11-pre1' | '16w44a' | '16w43a' | '16w42a' | '16w41a' | '16w40a' | '16w39c' | '16w39b' | '16w39a' | '16w38a' | '16w36a' | '16w35a' | '16w33a' | '16w32b' | '16w32a' | '1.10.2' | '1.10.1' | '1.10' | '1.10-pre2' | '1.10-pre1' | '16w21b' | '16w21a' | '16w20a' | '1.9.4' | '1.9.3' | '1.9.3-pre3' | '1.9.3-pre2' | '1.9.3-pre1' | '16w15b' | '16w15a' | '16w14a' | '1.9.2' | '1.9.1' | '1.9.1-pre3' | '1.9.1-pre3' | '1.9.1-pre2' | '1.9.1-pre1' | '1.9' | '1.9-pre4' | '1.9-pre3' | '1.9-pre2' | '1.9-pre1' | '16w07b' | '16w07a' | '16w06a' | '16w05b' | '16w05a' | '16w04a' | '16w03a' | '16w02a' | '15w51b' | '15w51a' | '15w50a' | '15w49b' | '15w49a' | '15w47c' | '15w47b' | '15w47a' | '15w46a' | '15w45a' | '15w44b' | '15w44a' | '15w43c' | '15w43b' | '15w43a' | '15w42a' | '15w41b' | '15w41a' | '15w40b' | '15w40a' | '15w39c' | '15w39b' | '15w39a' | '15w38b' | '15w38a' | '15w37a' | '15w36d' | '15w36c' | '15w36b' | '15w36a' | '15w35e' | '15w35d' | '15w35c' | '15w35b' | '15w35a' | '15w34d' | '15w34c' | '15w34b' | '15w34a' | '15w33c' | '15w33b' | '15w33a' | '15w32c' | '15w32b' | '15w32a' | '15w31c' | '15w31b' | '15w31a' | '15w14a' | '1.8.9' | '1.8.8' | '1.8.7' | '1.8.6' | '1.8.5' | '1.8.4' | '1.8.3' | '1.8.2' | '1.8.2-pre7' | '1.8.2-pre6' | '1.8.2-pre5' | '1.8.2-pre4' | '1.8.2-pre3' | '1.8.2-pre2' | '1.8.2-pre1' | '1.8.1' | '1.8.1-pre5' | '1.8.1-pre4' | '1.8.1-pre3' | '1.8.1-pre2' | '1.8.1-pre1' | '1.8' | '1.8-pre3' | '1.8-pre2' | '1.8-pre1' | '14w34d' | '14w34c' | '14w34b' | '14w34a' | '14w33c' | '14w33b' | '14w33a' | '14w32d' | '14w32c' | '14w32b' | '14w32a' | '14w31a' | '14w30c' | '14w30b' | '14w30a' | '14w29b' | '14w29a' | '14w28b' | '14w28a' | '14w27b' | '14w27a' | '14w26c' | '14w26b' | '14w26a' | '14w25b' | '14w25a' | '14w21b' | '14w21a' | '14w20b' | '14w20a' | '14w19a' | '14w18b' | '14w18a' | '14w17a' | '14w11b' | '14w11a' | '14w10c' | '14w10b' | '14w10a' | '14w08a' | '14w07a' | '14w06b' | '14w06a' | '14w05b' | '14w05a' | '14w04b' | '14w04a' | '14w03b' | '14w03a' | '14w02c' | '14w02b' | '14w02a' | '1.7.10' | '1.7.10-pre4' | '1.7.10-pre3' | '1.7.10-pre2' | '1.7.10-pre1' | '1.7.9' | '1.7.8' | '1.7.7' | '1.7.6' | '1.7.6-pre2' | '1.7.6-pre1' | '1.7.5' | '1.7.4' | '1.7.3-pre' | '13w49a' | '13w48b' | '13w48a' | '13w47e' | '13w47d' | '13w47c' | '13w47b' | '13w47a' | '1.7.2' | '1.7.1-pre' | '1.7-pre' | '13w43a' | '13w42b' | '13w42a' | '13w41b' | '13w41a' | '1.6.4' | '1.6.2' | '1.6.1' | '1.6-pre' | '13w26a' | '13w25c' | '13w25b' | '13w25a' | '13w24b' | '13w24a' | '13w23b' | '13w23a' | '13w22a' | '13w21b' | '13w21a' | '13w19a' | '13w18a' | '13w17a' | '13w16b' | '1.5.2' | '1.5.1' | '1.5' | '13w09b' | '13w06a' | '13w05b' | '13w05a' | '13w04a' | '13w03a' | '13w02a' | '13w01a' | '1.4.7' | '1.4.6' | '12w49a' | '1.4.5' | '1.4.4' | '1.4.3-pre' | '1.4.2' | '12w41a' | '12w40a' | '12w34b' | '12w34a' | '12w32a' | '1.3.2' | '1.3.1' | '12w27a' | '12w26a' | '12w25a' | '12w24a' | '12w23a' | '12w22a' | '12w21ab' | '12w19a' | '12w18a' | '12w17a' | '12w16a' | '1.2.5' | '1.2.4' | '1.2.3' | '1.2.2' | '1.2.1' | '12w07a' | '12w06a' | '12w01a' | '12w03a' | '12w04a' | '12w05a' | '1.1' | '1.0.0'
export type validConfig = {
    connection_port: number,
    connection_version: validMinecraftVersions,
    server_host: string,
    server_port: number,
    server_version: validMinecraftVersions,
    enable_example_plugin: boolean
}

type ChalkInstance = typeof chalk.blue & typeof chalk
export declare class Logger {
    time_colour: ChalkInstance | Function
    time_format: string

    info_colour: ChalkInstance | Function
    warn_colour: ChalkInstance | Function
    error_colour: ChalkInstance | Function
    success_colour: ChalkInstance | Function

    type_col_dict: {
        info: ChalkInstance | Function
        warn: ChalkInstance | Function
        error: ChalkInstance | Function
        success: ChalkInstance | Function
    }

    name_colour: ChalkInstance | Function
    name: string
    log_function: Function

    Log(message: string, type: string): void
    info(message: string): void
    warn(message: string): void
    error(message: string): void
    success(message: string): void
}

export declare class ChatLogger extends Logger {
    write: Function
    log_function: Function

    small(msg: string): void
    constructor(name: string, write: Function)
}

export class TimelessChatLogger extends ChatLogger {
    time_format: string
    constructor(name: string, write: Function)
}

export declare class Config {
    config: validConfig
    connection_port: number
    connection_version: validMinecraftVersions
    server_host: string
    server_port: number
    server_version: validMinecraftVersions
    enable_example_plugin: boolean

    constructor(path: string);
}

export declare class CommandManager {
    commands: {
        [key: string]: string
    }
    constructor()

    register_command(command: string, func: Function): void
    unregister_command(command: string): void
    execute_command(command: string, args: string[], client: mc.Client): void
    check_command(command: string): boolean
}

export type _pluginManifest = {
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
}

export declare class Plugins {
    cwd: string
    plugins: _pluginManifest[]

    logger: Logger
    config: Config
    proxy: GoldenProxy
    commandsManager: CommandManager

    constructor(logger: Logger, config: Config,
        proxy: GoldenProxy, commandsManager: CommandManager)

    loadPlugins(): void
    initPlugins(): void
}

export type colourify = (string: string) => string

export declare class GoldenProxy {
    server: mc.Server

    disabledPackets: string[]
    packets: string[]
    full_packets: Object[]

    config: Config
    logger: Logger
    client: mc.Client | null
    plugins: Plugins | null
    chatlogger: ChatLogger | null
    commandManager: CommandManager | null
    remoteClient: mc.Client | null
    loginListeners: ((username: string) => void)[]

    constructor(config: Config, logger: Logger, commands: CommandManager)
    emit(name: string, chan: string, ...args: any): boolean | void
    
    onLogin(callback: (username: string) => void): void
    
    server$listening(): void
    server$login(client: mc.Client): void
    remote$packet(packet: any, packetMeta: mc.PacketMeta, 
        buffer: Buffer, fullBuffer: Buffer, client: mc.Client): void
    client$packet(packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, 
        fullBuffer: Buffer, remoteClient: mc.Client, client: mc.Client): void
}

export declare class PluginConfig {
    path: string
    config: any

    constructor(pluginname: string, plugindir: string, logger: Logger)
    
    get(key: any): any | null
    set(key: any, value: any): void

    save(conf?: Object): void
}

export type API = {
    events: EventEmitter,
    proxy: GoldenProxy,
    chatlog: ChatLogger,
    timelesschatlog: TimelessChatLogger,
    commands: {
        register: (command: string, func: Function) => void,
        unregister: (command: string) => void,
        check: (command: string) => boolean,
    },
    util: {
        colourify: colourify
    },
    config: PluginConfig,
    plugins: _pluginManifest[]
}

export declare class GoldenProxyPlugin {
    constructor(logger: Logger, config: Config, api: API)
}