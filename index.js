require('dotenv').config(); //initialize dotenv
const db = require('./services/mongoose');

const Discord = require('discord.js'); //import discord.js
require('./Schedulers/tasks/OnlineCounting');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildPresences
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

async function start(){
  await client.login(process.env.CLIENT_TOKEN);
}
start()