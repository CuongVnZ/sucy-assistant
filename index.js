const Discord = require('discord.js');

class Main {
  constructor(Discord) {
    this.Discord = Discord;

    this.initDotenv();
    this.initDb();
    this.initClient();
    this.initHandlers();
    this.initReadyEvent();
    this.initLogin();
  }

  initDotenv() {
    require('dotenv').config();
  }

  initDb() {
    const db = require('./services/database');
  }

  initClient() {
    this.client = new this.Discord.Client({
      intents: [
        this.Discord.GatewayIntentBits.Guilds,
        this.Discord.GatewayIntentBits.GuildMembers,
        this.Discord.GatewayIntentBits.GuildVoiceStates,
        this.Discord.GatewayIntentBits.GuildMessages,
        this.Discord.GatewayIntentBits.GuildMessageReactions,
        this.Discord.GatewayIntentBits.MessageContent,
        this.Discord.GatewayIntentBits.GuildPresences
      ]
    });

    this.client.tickets = [];
    this.client.sucy = {};
    this.client.sucy.devMode = true;

    require('./games/GameManager')(this.Discord, this.client);
    require('./guilds/GuildManager')(this.Discord, this.client);

    this.client.commands = new this.Discord.Collection();
    this.client.events = new this.Discord.Collection();

    const { Player } = require("@jadestudios/discord-music-player");
    const player = new Player(this.client, {
        leaveOnEmpty: false, // This options are optional.
    });
    // You can define the Player as *client.player* to easily access it.
    this.client.player = player;
  }

  initHandlers() {
    const fs = require('fs')
    const handlerFiles = fs.readdirSync('handlers');
    handlerFiles.forEach((file) => {
      const handler = require(`./handlers/${file}`);
      handler(this.client, this.Discord);
    });
  }

  initReadyEvent() {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`);
      require('./schedulers/TaskController')(this.Discord, this.client);
    });
  }

  async initLogin() {
    await this.client.login(process.env.CLIENT_TOKEN);
  }
}


const main = new Main(Discord);
main.initLogin();