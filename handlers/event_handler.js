import fs from 'fs';

export default function (client, Discord) {

    const load_dir = async (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

        for(const file of event_files){
            // const event = require(`../events/${dirs}/${file}`)(Discord, client);
            const module = await import(`../events/${dirs}/${file}`);
            const event = module.default;
            event(Discord, client);
            // const event_name = event.name;
            // client.on(event_name, event.bind(null, Discord, client));
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e));
}