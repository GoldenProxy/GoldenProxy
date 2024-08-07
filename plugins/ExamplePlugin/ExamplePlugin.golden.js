/// <reference path="../../types/api.d.ts" />

const fs = require('fs');

module.exports = class {
    /**
     * 
     * @param {import('../../types/api.d.ts').Logger} logger 
     * @param {import('../../types/api.d.ts').PluginConfig} config 
     * @param {import('../../types/api.d.ts').API} api 
     * @returns 
     */
    constructor(logger, config, api) {
        console.log('ExamplePlugin loaded!');
        this.logger = logger;
        this.config = config;
        this.api = api;

        this.chat = api.chatlog;

        if (!config.enable_example_plugin) return;

        this.api.commands.register('/example', (args, client) => {
            this.chat.info('Example command ran! Args: ' + args.join(' '));
            this.chat.small('User: ' + client.username);
        });

        this.api.events.on('C2LS:flying', (cb, packet, packetMeta, buffer, fullBuffer, remoteClient, client) => {
            //this.logger.info(`C2LS:flying [${JSON.stringify(packet)}]`);

            cb(true);
        });
        
        this.api.events.on('C2LS:chat', (cb, packet, packetMeta, buffer, fullBuffer, remoteClient, client) => {
            //this.logger.info(`C2LS:flying [${JSON.stringify(packet)}]`);
            // console.log(`C2LS:chat [${JSON.stringify(packet)}]`)
            this.chat.info('Not Stopped chat message from being sent to server');


            cb(false);
        });
    }
}