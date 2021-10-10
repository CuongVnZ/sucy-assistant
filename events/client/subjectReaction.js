const TOAN = '🇹';
const LY = '🇱';
const HOA = '🇭';
const ANH = '🇦';

const messageId = '894580532573245500';

module.exports = (Discord, client) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        try { 
            message = reaction.message;
    
            if (message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!message.guild) return;
    
            if (message.id == messageId) {
                member = await message.guild.members.cache.get(user.id);
                switch(reaction.emoji.name){
                    case TOAN:
                        role = message.guild.roles.cache.find(role => role.name === "TOÁN")
                        await member.roles.add(role);
                        break;
                    case LY:
                        role = message.guild.roles.cache.find(role => role.name === "LÝ")
                        await member.roles.add(role);
                        break;
                    case HOA:
                        role = message.guild.roles.cache.find(role => role.name === "HÓA")
                        await member.roles.add(role);
                        break;
                    case ANH:
                        role = message.guild.roles.cache.find(role => role.name === "ANH")
                        await member.roles.add(role);
                        break;

                }
                console.log("[INFO] Added", reaction.emoji.name, "for", user.username)
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
    
            if (message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!message.guild) return;
    
            if (message.id == messageId) {
                member = await message.guild.members.cache.get(user.id);
                switch(reaction.emoji.name){
                    case TOAN:
                        role = message.guild.roles.cache.find(role => role.name === "TOÁN")
                        await member.roles.remove(role);
                        break;
                    case LY:
                        role = message.guild.roles.cache.find(role => role.name === "LÝ")
                        await member.roles.remove(role);
                        break;
                    case HOA:
                        role = message.guild.roles.cache.find(role => role.name === "HÓA")
                        await member.roles.remove(role);
                        break;
                    case ANH:
                        role = message.guild.roles.cache.find(role => role.name === "ANH")
                        await member.roles.remove(role);
                        break;

                }
                console.log("[INFO] Removed", reaction.emoji.name, "for", user.username)
            } else {
                return;
            }
        } catch (error) {
            console.log("[ERROR]", error)
        }
    })
}