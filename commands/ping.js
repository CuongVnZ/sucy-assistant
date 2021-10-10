module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args, Discord, client){
        message.channel.send('pong!');
    }
}