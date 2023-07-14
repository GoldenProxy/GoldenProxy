import logger from './src/Logger'
import GoldenProxy from './src/proxy'


const log = new logger('Golden')

log.info('Starting Golden...')

const proxy = new GoldenProxy()
