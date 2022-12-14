const music = require('@koenie06/discord.js-music');

module.exports = (Discord, client) => {
    console.log('Music Event Loaded');
    /* This will run when a new song started to play */
    music.event.on('playSong', (channel, songInfo, requester) => {
        channel.send({ content: `Started playing the song [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} | Requested by \`${requester}\`` });
    });

    /* This will run when a new song has been added to the queue */
    music.event.on('addSong', (channel, songInfo, requester) => {
        channel.send({ content: `Added the song [${songInfo.title}](${songInfo.url}) - ${songInfo.duration} to the queue | Added by \`${requester}\`` });
    });

    /* This will run when a song started playing from a playlist */
    music.event.on('playList', async (channel, playlist, songInfo, requester) => {
        channel.send({
            content: `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` of the playlist ${playlist.title}.
            This was requested by ${requester.tag} (${requester.id})`
        });
    });

    /* This will run when a new playlist has been added to the queue */
    music.event.on('addList', async (channel, playlist, requester) => {
        channel.send({
            content: `Added the playlist [${playlist.title}](${playlist.url}) with ${playlist.videos.length} amount of videos to the queue.
            Added by ${requester.tag} (${requester.id})`
        });
    });

    /* This will run when all the music has been played, and the bot disconnects. */
    music.event.on('finish', (channel) => {
        channel.send({ content: `All music has been played, disconnecting..` });
    });
};