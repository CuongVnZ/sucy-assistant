const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

async function initDb() {
  mongoose.set('strictQuery', true);
  console.log(process.env.MONGODB_SRV);
  await mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("[Info] Connected to the database!");
  });
}

function initClient() {
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
  client.sucy = {};
  client.sucy.devMode = true;

  client.commands = new Discord.Collection();
  client.events = new Discord.Collection();

  // require('./games/GameManager')(Discord, client);
  require('./guilds/GuildManager')(client);

  // Music Player
  const { Player } = require("@rafateoli/discord-music-player");
  const player = new Player(client, {
      leaveOnEmpty: true, // This options are optional.
  });
  // You can define the Player as *client.player* to easily access it.
  client.player = player;

  return client;
}

function initHandlers(client) {
  const fs = require('fs')
  const handlerFiles = fs.readdirSync('handlers');
  handlerFiles.forEach((file) => {
    const handler = require(`./handlers/${file}`);
    handler(client, Discord);
  });
}

function initReadyEvent(client) {
  client.on('ready', () => {
    console.log(`[INFO] Logged in as ${client.user.tag}!`);
    require('./schedulers/TaskController')(client);
  });
}

async function main() {
  await initDb();
  const client = initClient();
  initHandlers(client, Discord);
  initReadyEvent(client);
  await client.login(process.env.CLIENT_TOKEN);
}

main();