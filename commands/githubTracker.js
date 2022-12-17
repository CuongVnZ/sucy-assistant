const GithubTrackerManager = require('../features/GithubTracker/GithubTrackerManager')

// github repository-name #channel
module.exports = {
    name: 'github',
    description: "Github tracker command.",
    execute(message, args, Discord, client){
        // Extract the repository name and channel mention from the command
        const repository = message.content.split(' ')[1];
        const channel = message.mentions.channels.first();
        GithubTrackerManager(repository, channel)
    }
}