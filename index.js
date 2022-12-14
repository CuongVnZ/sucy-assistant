require('dotenv').config(); //initialize dotenv

const Discord = require('discord.js'); //import discord.js
const OnlineCounting = require('./Schedulers/tasks/OnlineCounting');

// const client = new Discord.Client({
//     intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_PRESENCES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"], 
//     partials: ["USER", "REACTION", "MESSAGE"] }); //create new client

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_PRESENCES
  ]
});

client.tickets = [];
client.sucy = {}
client.sucy.devMode = true;

require('./games/GameManager')(Discord, client)
require('./guilds/GuildManager')(Discord, client)

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  require('./schedulers/tasks/OnlineCounting')(Discord, client)
});

require('./services/mongoose');

async function start(){
  await client.login(process.env.CLIENT_TOKEN);
}

start()