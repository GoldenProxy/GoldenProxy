import LoggerType from './Logger'
import Config from './Config'

import mc from 'minecraft-protocol'
import data from 'minecraft-data'
import msal from 'msal-code'
import net from 'net'


export default class GoldenProxy {
    server: mc.Server

    disabledPackets: Array<string> = []
    packets: Array<string> = []
    full_packets: Array<Object> = []

    config: Config
    logger: LoggerType

    constructor(config: Config, logger: LoggerType) {
        this.config = config
        this.logger = logger

        this.server = mc.createServer({
            port: this.config.connection_port,
            version: this.config.connection_version,
        })

        this.server.on('listening', this.server$listening.bind(this))
        //this.server.on('login', this.server$login.bind(this))
        this.server.on('login', (client: mc.Client) => this.server$login(client))        
        
    }

    server$listening() {
        this.logger.info(`Golden has started on 127.0.0.1:${this.config.connection_port}`)
    }

    server$login(client: mc.Client) {
        this.logger.success(`${client.username} has joined the server!`)

        var remoteClient = mc.createClient({
            auth: 'microsoft',
            username: client.username,
            host: this.config.server_host,
            port: this.config.server_port,
            version: this.config.server_version,
        })

        remoteClient.on('connect', () => {
            this.logger.success(`Connected to ${this.config.server_host}:${this.config.server_port}`)
        })

        remoteClient.on('packet', (packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer) => {
            this.remote$packet(packet, packetMeta, buffer, fullBuffer, client)
        })

        client.on('packet', (packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer) => {
            //if (!['transaction','flying','keep_alive'].includes(packetMeta.name)) this.logger.info(packetMeta.name);
            this.client$packet(packet, packetMeta, buffer, fullBuffer, remoteClient)
        })
    }

    remote$packet(packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer, client: mc.Client) {
        if (!this.packets.includes(packetMeta.name)) {
            this.packets.push(packetMeta.name)
            this.full_packets.push(packet)


        }


        if (packetMeta.name == "custom_payload") {
//             console.log(packet)
            if (["FML|HS", "REGISTER", "MC|Brand", "badlion:mods"]) return; // Block
        }

        if (packetMeta.state !== mc.states.PLAY) return;

        if (!this.disabledPackets.includes(packetMeta.name)) client.write(packetMeta.name, packet)
    }

    client$packet(packet: any, packetMeta: mc.PacketMeta, buffer: Buffer, fullBuffer: Buffer, client: mc.Client) {
        if (!this.packets.includes(packetMeta.name)) {
            this.packets.push(packetMeta.name)
            this.full_packets.push(packet)


        }

        if (packetMeta.name == "chat") {
            if (packet.message.startsWith(".")) {
                
                if (packet.message == ".help") {
                    
                    client.write("chat", { message: JSON.stringify({ text: "no help for u"})})

                    return;
                }

            }
        }

        if(!this.disabledPackets.includes(packetMeta.name)) client.write(packetMeta.name, packet)
    }


}