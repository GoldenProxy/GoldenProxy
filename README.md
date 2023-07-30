<p align="center">
    <image src="assets/GoldBlock.png">
    <h1>GoldenProxy</h1>
</p>

<br>

Join the [Discord](https://discord.gg/fCzZb5p9F7)! <span style="float:right"><a href="https://discord.gg/fCzZb5p9F7"><img alt="badge" src="https://img.shields.io/static/v1.svg?label=OFFICIAL&message=DISCORD&color=blue&logo=discord&style=for-the-badge" align="right"></a></span>

## What is GoldenProxy?

GoldenProxy is a proxy server that allows you to modify your connection to a minecraft server, mainly through the use of plugins. It is written in TypeScript and utilises [node-minecraft-protocol](https://www.npmjs.com/package/minecraft-protocol).

## Usage

### Installation

1. Install [Node.js](https://nodejs.org/en/) (version 18 or higher)
2. Clone the repository
3. Open a terminal in the repository folder and run `npm install`
4. Copy `config.example.json` to `config.json` and edit it to your liking

### Running

1. Open a terminal in the repository folder and run `npm run dev`
2. Join the server you specified in the config (default: `localhost:25565` (`25565` can be changed with the field `connection_port`))
3. Check if installed with `.gldn plugins`

## Plugins

### Installation of plugins

1. Copy the plugin to the `plugins` folder, if needed, make a folder with the same name specified in the filename of `[name].golden.js`
2. Restart the server
