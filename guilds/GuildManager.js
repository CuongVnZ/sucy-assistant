import Guild from './Guild.js';
import fs from 'fs';
import mongoose from 'mongoose';
import GuildSchema from './schemas/GuildSchema.js';

const GuildManager = {
    loadGuildFromJson(guild, json) {
        guild.name = json.name;
        guild.id = json.id;
        guild.prefix = json.prefix;
        guild.features = json.features;

        return guild;
    },

    getGuild(id, client) {
        console.log(client.sucy.guilds)
        for (let i = 0; i < client.sucy.guilds.length; i++) {
            if (client.sucy.guilds[i].id === id) {
                return client.sucy.guilds[i];
            }
        }
        return null;
    },

    readDir(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.log(`Error reading file from disk: ${err}`);
                    reject(err);
                } else {
                    try {
                        const json = JSON.parse(data);
                        resolve(json);
                    } catch (error) {
                        console.log(`Error parsing JSON: ${error}`);
                        reject(error);
                    }
                }
            });
        });
    },

    saveGuild(guild) {
        const Guid = mongoose.model('guilds', GuildSchema);
        const newGuild = new Guid({
            name: guild.name,
            id: guild.id,
            prefix: guild.prefix,
            features: guild.features
        });

        newGuild.save((error) => {
            if (error) {
                console.error(`Error saving guild to database: ${error}`);
            } else {
                console.log(`[INFO] Successfully saved guild ${guild.name} to database.`);
            }
        });
    },

    initializeGuilds(client) {
        client.sucy.guilds = [];

        var dir = "./guilds/__data";
        this.readDir(dir)
        .then(files => {
            files.forEach(file => {
                const path = dir + "/" + file;
                this.readFile(path)
                .then(json => {
                    var guild = new Guild();
                    guild = this.loadGuildFromJson(guild, json);
                    client.sucy.guilds.push(guild);
                    // saveGuild(guild);
                    console.log("[INFO] Loaded " + guild.name + " from disk.");
                    console.log(client.sucy.guilds)
                });
            })
        });
    }
};

export default GuildManager;