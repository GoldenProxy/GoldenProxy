const path = require('path')

const input = require(path.join(__dirname, '..', 'node_modules', 'minecraft-data', 'minecraft-data', 'data', 'pc', 'common', 'protocolVersions.json'))

// const input = require('node_modules\\minecraft-data\\minecraft-data\\data\\pc\\common\\protocolVersions.json')

const output = input.map(version => version.minecraftVersion)

const array_path = path.join(__dirname, 'array.txt')
const type_path = path.join(__dirname, 'type.txt')

const fs = require('fs')

fs.writeFileSync(array_path, JSON.stringify(output, null, 4))
fs.writeFileSync(type_path, output.map(version => `'${version}'`).join(' | '))