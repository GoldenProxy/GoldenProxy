import EventEmitter from "events";

export default class Events extends EventEmitter {
    constructor() {
        super();
    }

    emit(event: string | symbol, ...args: any[]): boolean {
        //console.log(`Event emitted: ${event.toString()}`);
        return super.emit(event, ...args);
    }

    on(event: string | symbol, listener: (...args: any[]) => void): this {
        //console.log(`Event listener added: ${event.toString()}`);
        return super.on(event, listener);
    }

    once(event: string | symbol, listener: (...args: any[]) => void): this {
        //console.log(`Event listener added: ${event.toString()}`);
        return super.once(event, listener);
    }

    emitter = {
        chatReceived: (...args) => this.emit('chatReceived', ...args),
        chatSent: (...args) => this.emit('chatSent', ...args),
        lookDirectionChanged: (...args) => this.emit('lookDirectionChanged', ...args),
        positionChanged: (...args) => this.emit('positionChanged', ...args),
        worldChanged: (...args) => this.emit('worldChanged', ...args),
        playerJoined: (...args) => this.emit('playerJoined', ...args),
        playerLeft: (...args) => this.emit('playerLeft', ...args),
    }



    off(event: string | symbol, listener: (...args: any[]) => void): this {
        //console.log(`Event listener removed: ${event.toString()}`);
        return super.off(event, listener);
    }

    removeAllListeners(event?: string | symbol): this {
        //console.log(`All event listeners removed: ${event.toString()}`);
        return super.removeAllListeners(event);
    }

    listenerCount(event: string | symbol): number {
        //console.log(`Event listener count: ${event.toString()}`);
        return super.listenerCount(event);
    }

    listeners(event: string | symbol): Function[] {
        //console.log(`Event listeners: ${event.toString()}`);
        return super.listeners(event);
    }

    rawListeners(event: string | symbol): Function[] {
        //console.log(`Event raw listeners: ${event.toString()}`);
        return super.rawListeners(event);
    }

    prependListener(event: string | symbol, listener: (...args: any[]) => void): this {
        //console.log(`Event listener prepended: ${event.toString()}`);
        return super.prependListener(event, listener);
    }

    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this {
        //console.log(`Event listener prepended: ${event.toString()}`);
        return super.prependOnceListener(event, listener);
    }

    eventNames(): (string | symbol)[] {
        //console.log(`Event names`);
        return super.eventNames();
    }

    getMaxListeners(): number {
        //console.log(`Max listeners`);
        return super.getMaxListeners();
    }

    setMaxListeners(n: number): this {
        //console.log(`Max listeners set`);
        return super.setMaxListeners(n);
    }


}