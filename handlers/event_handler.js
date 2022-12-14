const fs = require('fs');

module.exports = function (client, Discord) {

    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of event_files){
            const event = require(`../events/${dirs}/${file}`)(Discord, client);
            // const event_name = event.name;
            // client.on(event_name, event.bind(null, Discord, client));
        }
    }

    ['client', 'guild', 'music'].forEach(e => load_dir(e));
}