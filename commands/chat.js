module.exports = {
    name: 'nora',
    description: "this is a test command!",
    execute(message, args, Discord, client){
        message.channel.send('Nora dep trai!');
    }
}