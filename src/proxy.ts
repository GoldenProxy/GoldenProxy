import LoggerType from './Logger'
import Config from './Config'
import Events from './Events'
import Plugins from './Plugins'
import { mcmotd, CLIENT_CHANNELS } from './consts'
import { 
    colourify as Colourify,
    ChatLogger,
    CommandManager
} from './Chat'

import mc from 'minecraft-protocol'
import data from 'minecraft-data'

export default class GoldenProxy {
    server: mc.Server

    disabledPackets: Array<string> = []
    packets: Array<string> = []
    full_packets: Array<Object> = []

    config: Config
    logger: LoggerType
    client: mc.Client | null = null
    plugins: Plugins | null = null /* CAN NOT BE USED IN CONSTRUCTOR */
    chatlogger: ChatLogger | null = null
    commandManager: CommandManager | null = null

    constructor(config: Config, logger: LoggerType, commands: CommandManager) {
        this.config = config
        this.logger = logger
        this.commandManager = commands

        this.server = mc.createServer({
            port: this.config.connection_port,
            version: this.config.connection_version,
            motd: mcmotd + this.config.server_host + ':' + this.config.server_port,
        })
        

        this.server.on('listening', this.server$listening.bind(this))
        //this.server.on('login', this.server$login.bind(this))
        this.server.on('login', (client: mc.Client) => this.server$login(client))     
        
        this.commandManager.register_command('.gldn', (args: string[]) => {
            switch (args[0]) {
                case 'plugins':
                    this.chatlogger?.info(`Golden Plugins (${this.plugins?.plugins.length})`)
                    for (const plugin of this.plugins!.plugins) {
                        //this.client?.write("chat", { message: JSON.stringify({ text: `${plugin.name} - ${plugin.manifest.Version}`})})
                        this.chatlogger?.small(`${plugin.name} - ${plugin.manifest.Version}`)
                    }

                    break;
                default:
                    this.chatlogger?.info(`Unknown command ${args[0]}`)
                    break;
            }
        })
        
    }

    emit(name: string, chan: string, ...args: any): boolean | void {
        let msg = `${chan}:${name}`
        let returnData = false;

        Events.emit(msg, (doReturn: boolean = false) => {
            returnData = doReturn;
            
            return returnData;
        }, ...args)

        return returnData;

        






    }

    server$listening() {
        this.logger.info(`Golden has started on 127.0.0.1:${this.config.connection_port}`)
    }

    server$login(client: mc.Client) {
        this.client = client;
        this.chatlogger = new ChatLogger('GoldenProxy', client.write.bind(client))

        this.logger.success(`${client.username} has joined the server!`)

        var remoteClient = mc.createClient({
            auth: 'microsoft',
            username: client.username,
            host: this.config.server_host,
            port: this.config.server_port,
            version: this.config.server_version,
        })
        
        // Remote client to server connection
        remoteClient.on('connect', () => {
            this.emit('connect', "R2RS", client, remoteClient)    
            
            this.logger.success(`Connected to ${this.config.server_host}:${this.config.server_port}`)
        })

        // Server to remote client packet (+remote > local packet)
        remoteClient.on('packet', (packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer) => {
            if (this.emit(packetMeta.name, "R2LC", packet, packetMeta, buffer, fullBuffer, client, remoteClient))
                return;
            
            this.remote$packet(packet, packetMeta, buffer, fullBuffer, client)
            
        })

        // Client to local server packet (+local > remoteclient packet)
        client.on('packet', (packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer) => {
            //if (!['transaction','flying','keep_alive'].includes(packetMeta.name)) this.logger.info(packetMeta.name);
            if (this.emit(packetMeta.name, "C2LS", packet, packetMeta, buffer, fullBuffer, remoteClient, client))
                return;

            this.client$packet(packet, packetMeta, buffer, fullBuffer, remoteClient, client)
        })

        client.on('end', () => {
            this.logger.warn(`${client.username} has left the server!`)
            remoteClient.end()
        })
    }

    remote$packet(packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer, client: mc.Client) {
        if (!this.packets.includes(packetMeta.name)) {
            this.packets.push(packetMeta.name)
            this.full_packets.push(packet)
        }


        if (packetMeta.name == "custom_payload") {
            if (CLIENT_CHANNELS.includes(packet.channel)) return;
        }
        

        if (packetMeta.state !== mc.states.PLAY) return;

        if (!this.disabledPackets.includes(packetMeta.name)) client.write(packetMeta.name, packet)
    }

    client$packet(packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer, remoteClient: mc.Client, client: mc.Client) {
        if (!this.packets.includes(packetMeta.name)) {
            this.packets.push(packetMeta.name)
            this.full_packets.push(packet)
        }

        // this.logger.info(packetMeta.name + " " + JSON.stringify(packet))

        if (packetMeta.name == "chat") {
            const _args = packet.message.split(" ")
            const cmd = _args[0]
            const args = _args.slice(1)
            
            if (this.commandManager?.check_command(cmd)) {
                this.commandManager?.execute_command(cmd, args, client)
                return;
            }
            
            
            
        }

        if(!this.disabledPackets.includes(packetMeta.name)) remoteClient.write(packetMeta.name, packet)
    }


}