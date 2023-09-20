import fs from 'fs';

export default async function handler(client, Discord) {
  const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const module = await import(`../commands/${file}`);
    const command = module.default;
    if (command.name) {
      console.log(`[INFO] Loaded command ${command.name}`)
      client.commands.set(command.name, command);
    } else {
      continue;
    }
  }
}