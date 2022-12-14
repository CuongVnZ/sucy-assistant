const music = require('@koenie06/discord.js-music');

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'queue'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message, args, client, Discord, cmd){

        if (['play', 'p'].find(x => x === cmd)) {
            const channel = message.member.voice.channel;

            if (!channel) {
                message.channel.send('You need to be in a voice channel to play music!');
                return;
            }

            const song = args.join(' ');
 
            music.play({
                interaction: message,
                channel: channel,
                song: song
            });
        }

        else if(['skip'].find(x => x === cmd)){
            const isConnected = await music.isConnected({
                interaction: message
            });
            if(!isConnected) return message.channel.send('There are no songs playing');
    
            /* Get more info about how the skip command works at https://npmjs.com/package/@koenie06/discord.js-music#skip */
            music.skip({
                interaction: message
            });
    
            message.channel.send(`Skipped the song`);
        }

        else if(['stop'].find(x => x === cmd)) {
            const isConnected = await music.isConnected({
                interaction: message
            });
            if(!isConnected) return message.channel.send('There are no songs playing');

            /* Checking if there is music playing or not. If there isn't, return. */
            const queue = music.getQueue({
                interaction: message
            });
            if(queue.length === 0) return message.channel.send('No music is playing');

            /* Get more info about how the stop command works at https://npmjs.com/package/@koenie06/discord.js-music#stop */
            music.stop({
                interaction: message
            });
    
            message.channel.send(`Stopped the song`);
        }

        else if(['queue'].find(x => x === cmd)) {
            /* Checking if the bot is connected. If it isn't, return. */
            const isConnected = await music.isConnected({
                interaction: message
            });
            if(!isConnected) return message.reply({ content: 'There are no songs playing', ephemeral: true });

            /* Get more info about how the getQueue command works at https://npmjs.com/package/@koenie06/discord.js-music#getqueue */
            const queue = await music.getQueue({
                interaction: message
            });

            let response = ``;

            for (let i = 0; i < queue.length; i++) {
                response += `${i + 1}. [${queue[i].info.title}](${queue[i].info.url}) - ${queue[i].info.duration}\n`
            };

            message.reply({ content: response });

        }
    }
    
}