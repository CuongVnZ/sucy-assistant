module.exports = (Discord, client) => {
    client.on('messageCreate', async (message) => {
        const prefix = '-';
        if(!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        const command = client.commands.get(cmd) || client.commands.find(command => command.aliases && command.aliases.includes(cmd));

        if(command) command.execute(message, args, Discord, client, cmd)
    });
}