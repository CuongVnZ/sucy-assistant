

module.exports = {
    name: 'nora',
    description: "this is a test command!",
    execute(message, args, Discord, client){
        chat = args[0]
        message.channel.send('Nora dep trai!');
    }
}