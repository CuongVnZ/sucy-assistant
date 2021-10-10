const { load } = require('dotenv');
const fs = require('fs');
const prefix = '-';

const { MessageEmbed } = require('discord.js');

module.exports = function (client, Discord) {

    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of event_files){
            const event = require(`../events/${dirs}/${file}`)(Discord, client);
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e));


    // client.on('ready', () => {
    //     channel = client.channels.cache.get('894212789688733718')
    //     const TOAN = '🇹';
    //     const LY = '🇱';
    //     const HOA = '🇭';
    //     const ANH = '🇦';
    //     let embed = new MessageEmbed()
    //     .setColor('#5AC0DE')
    //     .setTitle('**VUI LÒNG CHỌN MÔN BẠN GIỎI NHẤT**')
    //     .setDescription(`Chọn môn học bằng cách nhấn vào các reaction bên dưới\n
    //         🇹 : TOÁN\n
    //         🇱 : LÝ\n
    //         🇭 : HÓA\n
    //         🇦 : ANH\n\n`);

    //     let messageEmbed = channel.send({ embeds: [embed] })
    //     .then(message => {
    //         message.react(TOAN)
    //         message.react(LY)
    //         message.react(HOA)
    //         message.react(ANH)
    //     })
    //     .catch(console.error);;
    // }) 
    
}