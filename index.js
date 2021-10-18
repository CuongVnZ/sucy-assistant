require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client({ 
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"], 
    partials: ["USER", "REACTION", "MESSAGE"] }); //create new client

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

require('./services/mongoose');
require('./games/GameController')(Discord, client)

client.devMode = false;

client.login(process.env.CLIENT_TOKEN);