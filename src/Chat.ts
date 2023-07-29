import Logger from './Logger'
import { Client } from 'minecraft-protocol'

export const colourify_motd = (string: string): string => {
    return string.replace(/&([0-9a-fk-or])/g, '\u00A7$1')
}

export const colourify = (string: string): string => {
    return string.replace(/&([0-9a-fk-or])/g, '§$1')
}

export class ChatLogger extends Logger {
    write: Function
    log_function: Function
    small: Function = ((msg: string) => {
        this.log_function(`&7> &r${msg}`)
    })

    raw: Function

    
    constructor(name: String, write: Function) {
        super(name)
        this.write = write

        
        this.log_function = (msg: string) => {
            let data = {
                message: JSON.stringify({
                    text: colourify(msg)
                })
            }
            // console.log(data)
            this.write('chat', data)
        }

        this.raw = (msg: Object) => {
            this.write('chat', msg)
        }


        


        this.time_colour = (x: string) => '&7' + x + '&r'
        this.info_colour = (x: string) => '&9' + x + '&r'
        this.warn_colour = (x: string) => '&e' + x + '&r'
        this.error_colour = (x: string) => '&c' + x + '&r'
        this.success_colour = (x: string) => '&a' + x + '&r'

        this.name_colour = (x: string) => '&d' + x + '&r'

        this.type_col_dict = {
            'info': this.info_colour,
            'warn': this.warn_colour,
            'error': this.error_colour,
            'success': this.success_colour
        }

        /*console.log(
            this,
            this.time_colour('test'),
            this.info_colour('test'),
            this.warn_colour('test'),
            this.error_colour('test'),
            this.success_colour('test'),
            this.name_colour('test')
        )*/
    }
}

export class CommandManager {
    commands: any
    constructor() {
        this.commands = {}
    }

    register_command(command: string, func: Function) {
        this.commands[command] = func
    }

    unregister_command(command: string) {
        delete this.commands[command]
    }

    execute_command(command: string, args: string[], client: Client) {
        if (this.commands[command]) {
            this.commands[command](args, client)
        }
    }

    check_command(command: string): boolean {
        return this.commands[command] ? true : false
    }
}