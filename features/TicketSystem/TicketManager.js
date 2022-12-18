const { EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');
const GuildManager = require('../../guilds/GuildManager');
const Ticket = require('./Ticket');

async function createTicket(message, args, Discord, client){
    const currentGuild = GuildManager.getGuild(message.guild.id, Discord, client);

    const TICKET_CATEGORY = currentGuild.features.ticketSystem.categoryId;
    const GENERAL_CHANNEL_ID = currentGuild.features.ticketSystem.generalChannelId;
    var generalChannel = client.channels.cache.get(GENERAL_CHANNEL_ID)

    const ticketName = `ticket : ${message.author.tag}`
    const channel = await message.guild.channels.create({
        name: ticketName,
        type: ChannelType.GuildText,
        parent: TICKET_CATEGORY,
        permissionOverwrites: [
            {
                id: message.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: message.author.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
            },
        ],
    });

    // channel.permissionOverwrites.create(message.guild.id, {
    //     SEND_MESSAGES: false,
    //     VIEW_CHANNEL: false,
    // });
    // channel.permissionOverwrites.create(message.author, {
    //     SEND_MESSAGES: true,
    //     VIEW_CHANNEL: true,
    // })

    let embed = new EmbedBuilder()
    .setColor('#5AC0DE')
    .setTitle('**You have created a ticket!**')
    .setDescription(`\nPlease ask your question and wait for members to help you!`);
        
    let reactionMesssage = await channel.send({ embeds: [embed] })
    
    try {
        await reactionMesssage.react("🔒");
        await reactionMesssage.react("⛔");
    } catch (err) {
        channel.send("Error sending emojis!");
        throw err;
    }

    var title = 'NO TITLE'
    if(args.length > 0){
        title = args.join(" ");
    }

    var messageGeneral = await sendGeneral(generalChannel, client, message.author, title, channel.id);
    await sleep(1000);

    const collector = reactionMesssage.createReactionCollector(
      (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
      { dispose: true }
    );

    collector.on("collect", (reaction, user) => {
        var emoji = reaction.emoji.name;

        var member = message.guild.members.cache.find((member) => member.id === user.id)
        var allowedRole = member.roles.cache.some(role => role.name === 'ADMINISTRATOR')
        if(!allowedRole) return

        switch(emoji){
            case "🔒":
            channel.permissionOverwrites.create(message.author, { SEND_MESSAGES: false });
            break;
            case "⛔":
            channel.send("This channel will be deleted after 5 seconds!");
            setTimeout(() => {
                channel.delete();
                messageGeneral.delete();
            }, 5000);
            break;
        }
    });
  
    message.channel
        .send(`You have created a ticket: ${channel}`)
        .then((msg) => {
        setTimeout(async () => {
            await msg.delete()
        }, 7000);
        setTimeout(async () => {
            await message.delete()
        }, 3000);
        })
        .catch((err) => {
        throw err;
        });
    
    var ticket = new Ticket(ticketName, message.author, channel.id, messageGeneral, message.guild);
    client.tickets.push(ticket);
    
    console.log("[INFO]", message.author.username, "has created a ticket", ticketName)
}

async function sendGeneral(generalChannel, client, user, title, ticketChannelId){
    const ICON = '✅'
    let embed = new EmbedBuilder()
    .setColor('#5AC0DE')
    .setTitle(user.username + ' has asked a question with title ' + '`' + title + '`')
    .setDescription(`Help ${user.username} by react to the icon below\n
        
        ${ICON} : TO JOIN THE CHANNEL\n\n
        <@everyone>`);

    let messageEmbed = await generalChannel.send({ embeds: [embed] })
    .then(message => {
        message.react(ICON)
        return message;
    })
    .catch(console.error);

    confirmJoinEvent(client, messageEmbed.id, ticketChannelId)
    return messageEmbed;
}

async function confirmJoinEvent(client, messageId, ticketId){
    client.on('messageReactionAdd', async (reaction, user) => {
        try { 
            let ticketChannel = client.channels.cache.get(ticketId)
            let message = reaction.message;
    
            if (message.partial) await message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!message.guild) return;
    
            if (message.id == messageId) {
                if (reaction.emoji.name === '✅') {
                    var member = await message.guild.members.cache.get(user.id);
    
                    await ticketChannel.permissionOverwrites.set([
                        {
                            id: member.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        }
                    ])
    
                    await ticketChannel.send(`<@${user.id}>` + ' has joined!')
    
                    console.log("[INFO] Added", user.username, "for ticket ", ticketId)
                }
            } else {
                return;
            }
        } catch (error) {
            console.log("[ERROR]", error)
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.createTicket = createTicket;