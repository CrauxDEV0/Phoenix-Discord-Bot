
const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs');
const mongo = require("./mongo.js")
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

module.exports = client;

const mongoose = require('mongoose');

      
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const express = require("express")
const app = express();
app.get('/',(req,res) => {
  res.send("Bot is online")
})
app.listen(3000)
console.log("Bot is Online 24/7")


client.once('ready',() => {
    client.user.setActivity('%help')
    mongoose.connect(process.env.MONGODB_SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Connected to MONGODB!"))
});



client.login(process.env.TOKEN).then(() => {
  console.log((
      ` Successfully logged in as: ${client.user.tag} `
    )
  );
});


