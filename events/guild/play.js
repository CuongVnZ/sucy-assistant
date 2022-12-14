const music = require('@koenie06/discord.js-music');

module.exports = (Discord, client) => {
    client.on('interactionCreate', async (interaction) => {
        console.log(interaction)
        if(interaction.isCommand()) {
            if(interaction.commandName === 'play') {
    
                /*
                 * This function requires 3 options:
                 * 1) Interaction. The interaction you got from the 'interactionCreate' event.
                 * 2) Channel. The Voice Channel where the music is supposed to be played in.
                 * 3) Song. A song name/URL that needs to be played.
                */
    
               const channel = interaction.member.voice.channel;
               const song = interaction.options.getString('song');
    
               music.play({
                   interaction: interaction,
                   channel: channel,
                   song: song
               });
            };
        };
    });
}