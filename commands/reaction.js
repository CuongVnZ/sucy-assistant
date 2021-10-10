const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '894238177487880224';
        const confirmRole = message.guild.roles.cache.find(role => role.name === "MEMBER");
 
        const confirmEmoji = '✅';
 
        let embed = new MessageEmbed()
            .setColor('#e42643')
            .setTitle('**Vui lòng xác nhận thành viên!**')
            .setDescription('Hãy *react* vào icon bên dưới để xác nhận!\n\n'
                + `${confirmEmoji}\n`);
 
        let messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(confirmEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {

                console.log("OK")
                if (reaction.emoji.name === confirmEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(confirmRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === confirmEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(confirmRole);
                }
            } else {
                return;
            }
        });
    }
 
}   