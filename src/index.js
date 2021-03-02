const DiscordRPC = require("discord-rpc");
const { app } = require("electron");
const config = require("./config.json");

DiscordRPC.register(config.appID);
const rpc = new DiscordRPC.Client({ transport: "ipc" });
const timestamp = new Date();

const startRPC = async() => {
    rpc.setActivity({
        details: config.details,
        state: config.state,
        startTimestamp: config.startTimestamp.toLowerCase() === "now" ? timestamp : config.startTimestamp,
        largeImageKey: config.largeImageKey,
        largeImageText: config.largeImageText,
        smallImageKey: config.smallImageKey,
        smallImageText: config.smallImageText
    })
}

rpc.on('ready', () => {
    startRPC();
})

rpc.login({ clientId: config.appID }).then(console.log("[INFO] Started RPC! Exit console to stop it")).catch(console.error);