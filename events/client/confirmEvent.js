const confirmEmoji = '✅';
const messageId = '894425248634650675';

module.exports = (Discord, client) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        try { 
            message = reaction.message;

            if (message.partial) await message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!message.guild) return;

            const confirmRole = await message.guild.roles.cache.find(role => role.name === "MEMBER");

            if (message.id == messageId) {
                if (reaction.emoji.name === confirmEmoji) {
                    member = await message.guild.members.cache.get(user.id);
                    await member.roles.add(confirmRole);
                    console.log("[INFO] Given", confirmRole.name, "for", user.username)
                }
            } else {
                return;
            }
        } catch (error) {
            console.log("[ERROR]", error)
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        try {
            message = reaction.message;
            const confirmRole = await message.guild.roles.cache.find(role => role.name === "MEMBER");
    
            if (message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!message.guild) return;
    
            if (message.id == messageId) {
                if (reaction.emoji.name === confirmEmoji) {
                    member = await message.guild.members.cache.get(user.id);
                    if(member == undefined) return 
                    await member.roles.remove(confirmRole);
                    console.log("[INFO] Removed", confirmRole.name, "for", user.username)
                }
            } else {
                return;
            }
        } catch (error) {
            console.log("[ERROR]", error)
        }
    })
}