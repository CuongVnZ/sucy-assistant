import { RepeatMode } from '@rafateoli/discord-music-player';
import { EmbedBuilder } from 'discord.js';

export default {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'queue'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'This is a music bot command that allows you to play music on the Discord server.',
    async execute(message, args, Discord, client, cmd){
        let guildQueue = client.player.getQueue(message.guild.id);
        if (['play', 'p'].find(x => x === cmd)) {
            let queue = client.player.createQueue(message.guild.id);

            let voiceChannel = message.member.voice.channel;
            if(!voiceChannel) return message.channel.send('You need to be in a voice channel to play music.');

            await queue.join(message.member.voice.channel);
            let song = await queue.play(args.join(' ')).catch(err => {
                console.log(err);
                if(!guildQueue)
                    queue.stop();
            });
            const response = new EmbedBuilder()
                .setTitle('Now Playing')
                .setDescription(`[${song.name}](${song.url})`)
                .setThumbnail(song.thumbnail)
                .setColor('#FF0000')
                .setFooter({text: `Requested by ${message.author.username}`})
                .setTimestamp()
            message.channel.send({ embeds: [response] });

            message.delete();

            // queue.on('songChanged', (oldSong, newSong, skipped, repeatMode) => {
            //     if(repeatMode){
            //         response = new EmbedBuilder()
            //             .setTitle('Now Playing')
            //             .setDescription(`[${newSong.name}](${newSong.url})`)
            //             .setThumbnail(newSong.thumbnail)
            //             .setColor('#FF0000')
            //             .setFooter({text: `Requested by ${message.author.username}`})
            //             .setTimestamp()
            //         message.channel.send({ embeds: [response] });
            //     }
            // }
            // );
        }

        else if(['skip'].find(x => x === cmd)){
            let voiceChannel = message.member.voice.channel;
            if(!voiceChannel) return message.channel.send('You need to be in a voice channel to play music.');

            if(!guildQueue)
                return message.channel.send('There is no song that I could skip.');

            guildQueue.skip();
        }

        else if(['stop'].find(x => x === cmd)) {
            let voiceChannel = message.member.voice.channel;
            if(!voiceChannel) return message.channel.send('You need to be in a voice channel to play music.');

            if(!guildQueue)
                return message.channel.send('There is no song that I could stop.');

            guildQueue.stop();
        }

        else if(['queue'].find(x => x === cmd)) {
            let voiceChannel = message.member.voice.channel;
            if(!voiceChannel) return message.channel.send('You need to be in a voice channel to play music.');

            if(!guildQueue)
                return message.channel.send('There is no song in queue.');

            let queue = guildQueue.songs.map((song, i) => {
                return `${i === 0 ? 'Now Playing' : `#${i+1}`} - ${song.name}`;
            }).join('\n');

            response = new EmbedBuilder()
                .setTitle('Server Queue')
                .setDescription(queue)
                .setColor('#FF0000')
                .setTimestamp()
            message.channel.send({ embeds: [response] });
        }
    }
    
}