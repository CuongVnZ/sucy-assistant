module.exports = (Discord, client) => {
    //console.log(client.sucy.guilds, "1")
    client.on('messageReactionAdd', async (reaction, user) => {
        try {
            var guildConfig = getGuildConfig(reaction.message.guild, client);
            
            var reactionSystem = guildConfig.features.reactions
            var messages = reactionSystem.messages;

            var message = reaction.message;
            var guild = message.guild;
    
            if (message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!guild) return;
            
            messages.forEach(async messageEvent => {
                var __messageId = messageEvent.id;
                if (message.id != __messageId) return
                var __member = await message.guild.members.cache.get(user.id);

                var __roles = messageEvent.roles;
                var __symbols = messageEvent.symbols;

                //Check reaction type
                for(i = 0; i < messageEvent.symbols.length; i++) {
                    if(reaction.emoji.name == __symbols[i]) {
                        var __role = guild.roles.cache.find(role => role.name === __roles[i])
                        await __member.roles.add(__role);
                        console.log("[INFO] Added", reaction.emoji.name, "for", user.username)
                    }
                }
            });
        } catch (error) {
            console.log("[ERROR]", error)
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        try {
            var guildConfig = getGuildConfig(reaction.message.guild, client);
            
            var reactionSystem = guildConfig.features.reactions
            var messages = reactionSystem.messages;

            var message = reaction.message;
            var guild = message.guild;
    
            if (message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!guild) return;
    
            messages.forEach(async messageEvent => {
                var __messageId = messageEvent.id;
                if (message.id != __messageId) return
                var __member = await message.guild.members.cache.get(user.id);

                var __roles = messageEvent.roles;
                var __symbols = messageEvent.symbols;

                //Check reaction type
                for(i = 0; i < messageEvent.symbols.length; i++) {
                    if(reaction.emoji.name == __symbols[i]) {
                        var __role = guild.roles.cache.find(role => role.name === __roles[i])
                        await __member.roles.remove(__role);
                        console.log("[INFO] Removed", reaction.emoji.name, "for", user.username)
                    }
                }
            });
        } catch (error) {
            console.log("[ERROR]", error)
        }
    })
}

function getGuildConfig(guild, client) {
    var guildConfig = {}
    client.sucy.guilds.forEach(g => {
        if (g.id == guild.id) {
            guildConfig = g;
        }
    })
    return guildConfig;
}