module.exports = {
    name: "help",
    description: "Displays all commands",
    execute(message, args, Discord, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setDescription("All commands")
            .setColor("#0099ff")
            .setFooter("Powered by C")
            .setTimestamp();
        for (const command of client.commands) {
            embed.addField(`${command[1].name}`, `${command[1].description}`)
        }
        message.channel.send({ embeds: [embed] });
    }

}