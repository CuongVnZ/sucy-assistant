const { MessageEmbed } = require('discord.js');
const GuildManager = require('../../guilds/GuildManager');
const Ticket = require('./Ticket');

var TICKET_CATEGORY = '894221933497962496'
var GENERAL_CHANNEL_ID = '895025719254581248' //'891536512934608940' 

async function createTicket(message, args, Discord, client){
    TICKET_CATEGORY = GuildManager.getGuild(message.guild.id, Discord, client).features.ticketSystem.categoryId;
    GENERAL_CHANNEL_ID = GuildManager.getGuild(message.guild.id, Discord, client).features.ticketSystem.generalChannelId;

    const ticketName = `ticket : ${message.author.tag}`
    const channel = await message.guild.channels.create(ticketName);
    channel.setParent(TICKET_CATEGORY);

    channel.permissionOverwrites.create(message.guild.id, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
    });
    channel.permissionOverwrites.create(message.author, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
    })

    //const reactionMesssage = await channel.send('**Bạn đã tạo một câu hỏi!** \n\n Vui lòng gửi nội dung câu hỏi và đợi mọi người trả lời :3')
    let embed = new MessageEmbed()
    .setColor('#5AC0DE')
    .setTitle('**Bạn đã tạo một câu hỏi!**')
    .setDescription(`\nVui lòng gửi nội dung câu hỏi và đợi mọi người trả lời :3`);
        
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
    var messageGlobal = await sendGlobal(Discord, client, message.author, title, channel.id);
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
            channel.send("Kênh này sẽ bị xóa sau 5 giây!");
            setTimeout(() => {
                channel.delete();
                messageGlobal.delete();
            }, 5000);
            break;
        }
    });
  
    message.channel
        .send(`Bạn đã tạo một câu hỏi! ${channel}`)
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
    
    var ticket = new Ticket(ticketName, message.author, channel.id, messageGlobal, message.guild);
    client.tickets.push(ticket);
    
    console.log("[INFO]", message.author.username, "has created a ticket", ticketName)
}

async function sendGlobal(Discord, client, user, title, ticketChannelId){
    let channel = client.channels.cache.get(GENERAL_CHANNEL_ID)

    const ICON = '✅'
    let embed = new MessageEmbed()
    .setColor('#5AC0DE')
    .setTitle(user.username + ' đã đăng một câu hỏi với tiêu đề ' + '`' + title + '`')
    .setDescription(`Tham gia trả lời bằng cách nhấn vào react bên dưới\n
        
        ${ICON} : THAM GIA TRẢ LỜI\n\n
        <@everyone>`);

    let messageEmbed = await channel.send({ embeds: [embed] })
    .then(message => {
        message.react(ICON)
        return message;
    })
    .catch(console.error);

    confirmJoinEvent(Discord, client, messageEmbed.id, ticketChannelId)
    return messageEmbed;
}

async function confirmJoinEvent(Discord, client, messageId, ticketId){
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
    
                    await ticketChannel.permissionOverwrites.create(member, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                    })
    
                    await ticketChannel.send(`<@${user.id}>` + ' đã tham gia!')
    
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
module.exports.confirmJoinEvent = confirmJoinEvent;
module.exports.sendGlobal = sendGlobal;
module.exports.sleep = sleep;