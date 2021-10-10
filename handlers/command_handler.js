const fs = require('fs');
const prefix = '-';
module.exports = function (client, Discord) {

    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for(const file of commandFiles){
        const command = require(`../commands/${file}`);
     
        client.commands.set(command.name, command);
    }

    client.on('messageCreate', message =>{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
     
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
     
        if(client.commands.get(command) != undefined){
            client.commands.get(command).execute(message, args, Discord, client);
        } 
    });
}