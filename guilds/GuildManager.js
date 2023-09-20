import Guild from './Guild.js';
import fs from 'fs';
import mongoose from 'mongoose';
import GuildSchema from './schemas/GuildSchema.js';

export default (client) => {
    client.sucy.guilds = [];

    var dir = "./guilds/__data";
    readDir(dir)
    .then(function(files){
        files.forEach(file => {
            const path = dir + "/" + file;
            readFile(path)
            .then(json => {
                var guild = new Guild();
                guild = loadGuildFromJson(guild, json);
                client.sucy.guilds.push(guild);
                // saveGuild(guild);
                console.log("[INFO] Loaded " + guild.name + " from disk.");
            });
        })
    });
}

function loadGuildFromJson(guild, json) {
    guild.name = json.name;
    guild.id = json.id;
    guild.prefix = json.prefix;
    guild.features = json.features;

    return guild;
}

function getGuild(id, Discord, client) {
    for(var i = 0; i < client.sucy.guilds.length; i++){
        if(client.sucy.guilds[i].id == id){
            return client.sucy.guilds[i];
        }
    }
    return null;
}

function readDir(dir){
    return new Promise(function(resolve, reject){
        fs.readdir(dir, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            } else {
                resolve(data);
            }
        });
    });
}

function readFile(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, 'utf8', (err, data) => {

            if (err) {
                console.log(`Error reading file from disk: ${err}`);
            } else {
                // parse JSON string to JSON object
                const json = JSON.parse(data);
                resolve(json);
            }
        
        });
    });
}

function saveGuild(guild) {
    // Create a model from the schema
    const Guid = mongoose.model('guilds', GuildSchema);

    // Create a new document from the model
    const newGuild = new Guid({
        name: guild.name,
        id: guild.id,
        prefix: guild.prefix,
        features: guild.features
    });

    // Save the document to the database
    newGuild.save((error) => {
    if (error) {
        console.error(`Error saving guild to database: ${error}`);
    } else {
        console.log(`[INFO] Successfully saved guild ${guild.name} to database.`);
    }
    });
}
  
export { getGuild, saveGuild };