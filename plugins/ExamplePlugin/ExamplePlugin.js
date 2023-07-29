const fs = require('fs');

module.exports = class {
    constructor(logger, config, api) {
        console.log('AssistMe plugin loaded!');
        this.logger = logger;
        this.config = config;
        this.api = api;

        this.chat = api.chatlog;

        this.api.events.on('C2LS:flying', (cb, packet, packetMeta, buffer, fullBuffer, remoteClient, client) => {
            //this.logger.info(`C2LS:flying [${JSON.stringify(packet)}]`);

            cb(true);
        });
        
        this.api.events.on('C2LS:chat', (cb, packet, packetMeta, buffer, fullBuffer, remoteClient, client) => {
            //this.logger.info(`C2LS:flying [${JSON.stringify(packet)}]`);
            // console.log(`C2LS:chat [${JSON.stringify(packet)}]`)
            this.chat('Stopped chat message from being sent to server');


            cb(true);
        });
    }
}