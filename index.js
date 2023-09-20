import Discord from 'discord.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import GuildManager from './guilds/GuildManager.js';

import { Player } from '@rafateoli/discord-music-player';

import fs from 'fs';

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

  GuildManager(client);

  // Music Player
  const player = new Player(client, {
      leaveOnEmpty: true, // This options are optional.
  });
  // You can define the Player as *client.player* to easily access it.
  client.player = player;

  return client;
}

function initHandlers(client) {
  const handlerFiles = fs.readdirSync('handlers');
  handlerFiles.forEach( async (file) => {
    const module = await import(`./handlers/${file}`);
    const handler = module.default;
    handler(client, Discord);
  });
}

function initReadyEvent(client) {
  client.on('ready', async () => {
    console.log(`[INFO] Logged in as ${client.user.tag}!`);
    const module = await import(`./schedulers/TaskController.js`);
    const handler = module.default;
    handler(client);
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