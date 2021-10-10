const Werewolf = require('../games/werewolf/Werewolf')

module.exports = {
    name: 'werewolf',
    description: "this is a test command!",
    async execute(message, args, Discord, client){
        message.channel.send('Nora dep trai!');

        var ww = client.werewolf;
        var game = ww.create()

        await sendGlobal(Discord, client, game, message.author, [])
        // player1 = game.addPlayer("Sucy1");
        // player2 = game.addPlayer("Sucy2");
        // setTimeout(() => {
        //     game.removePlayer(player1)
        // }, 3000)

        // setTimeout(() => {
        //     console.log(game.players[0].user)
        // }, 6000)
    }
}

const { MessageEmbed } = require('discord.js');
async function sendGlobal(Discord, client, game, user, voiceGameRoom){
    channel = client.channels.cache.get('895025719254581248')
    const CONFIRM = '✅'
    const START = '💡'
    let embed = new MessageEmbed()
    .setColor('#5AC0DE')
    .setTitle(`${user.username} đã tạo phòng chơi Ma Sói`)
    .setDescription(`Tham gia chơi bằng cách nhấn vào reaction bên dưới\n
        
        ${CONFIRM} : THAM GIA\n\n
        <@everyone>`);

    let messageEmbed = await channel.send({ embeds: [embed] })
    .then(async message => {
        await message.react(CONFIRM)
        await message.react(START)
        return message;
    })
    .catch(console.error);

    await confirmJoinEvent(Discord, client, game, messageEmbed, voiceGameRoom)
    return messageEmbed;
}

async function confirmJoinEvent(Discord, client, game, globalMessage, voiceGameRoom){
    client.on('messageReactionAdd', async (reaction, user) => {
        try { 
            //channel = client.channels.cache.get(ticketId)
    
            message = reaction.message;
    
            if (message.partial) await message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!message.guild) return;
    
            if (message.id == globalMessage.id) {
                if (reaction.emoji.name === '✅') {
                    member = await message.guild.members.cache.get(user.id);
    
                    game.addPlayer(user)
                    // await channel.permissionOverwrites.create(member, {
                    //     SEND_MESSAGES: true,
                    //     VIEW_CHANNEL: true,
                    // })
    
                    // await channel.send(`<@${user.id}>` + ' đã tham gia!')
    
                    console.log("[INFO]", user.username, "joined the room")
                }
            } else {
                return;
            }
        } catch (error) {
            console.log("[ERROR]", error)
        }
    })
}