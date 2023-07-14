type m = {
    msg: String
}


let str: m | null = { msg: 'Hello, World!' }

import logger from './src/Logger'

const log = new logger('Golden')

log.info('Hello, World!')
log.warn('Hello, World!')
log.error('Hello, World!')
log.success('Hello, World!')