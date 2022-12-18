module.exports = {
    name: "help",
    description: "Displays all commands",
    execute(message, args, Discord, client) {
        const embed = new Discord.EmbedBuilder()
            .setTitle("Help")
            .setDescription("All commands")
            .setColor("#0099ff")
            .setFooter({ text: "Powered by Sucy-assistant" })
            .setTimestamp();
        for (const command of client.commands) {
            embed.addFields({ name: "-" + command[1].name, value: command[1].description})
        }
        message.channel.send({ embeds: [embed] });
    }

}