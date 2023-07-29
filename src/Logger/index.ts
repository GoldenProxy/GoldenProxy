import chalk from 'chalk';
import { strftime } from '../strftime';

/*
    This code has been adapted from https://github.com/AnotherPillow/farm-computer/blob/main/src/logger.py
    */

export default class /* Logger */ {
    time_colour: chalk.Chalk | Function = chalk.gray
    time_format: String = '%Y-%m-%d %H:%M:%S'

    info_colour: chalk.Chalk | Function = chalk.blue
    warn_colour: chalk.Chalk | Function = chalk.yellow
    error_colour: chalk.Chalk | Function = chalk.redBright
    success_colour: chalk.Chalk | Function = chalk.green

    
    type_col_dict = {
        'info': this.info_colour,
        'warn': this.warn_colour,
        'error': this.error_colour,
        'success': this.success_colour
    }
    
    name_colour: chalk.Chalk | Function = chalk.magentaBright

    name: String

    log_function: Function = console.log


    constructor(name: String) {
        this.name = name
    }

    Log(message: String, type: String) {
        let type_colour = this.info_colour
        
        if (this.type_col_dict.hasOwnProperty(type as PropertyKey))
            type_colour = this.type_col_dict[type as keyof typeof this.type_col_dict]
            //type_colour = this[`${type}_colour`]

        const formatted_date = strftime(this.time_format, new Date())

        if (process.stdout.columns && process.stdout.columns > 0) 
            process.stdout.moveCursor(-2, 0)
        
        

        this.log_function(
            `${this.time_colour(formatted_date)} ` + 
            `${type_colour(type.toUpperCase())}${" ".repeat(5 - type.length + 4)}` +
            `${this.name_colour(this.name)} ` + message
        )
    }

    info(message: String) {
        this.Log(message, 'info')
    }

    warn(message: String) {
        this.Log(message, 'warn')
    }

    error(message: String) {
        this.Log(message, 'error')
    }

    success(message: String) {
        this.Log(message, 'success')
    }
}