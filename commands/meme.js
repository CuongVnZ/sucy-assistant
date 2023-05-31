const axios = require('axios'); // Require the 'axios' package to make API requests

module.exports = {
    name: 'meme',
    description: "This command generates or displays a meme.",
    execute(message, args, Discord, client){
        // Send a request to the Reddit API to get a random meme from the 'dankmemes' subreddit
        axios.get('https://www.reddit.com/r/dankmemes/random.json')
            .then(res => {
            // Get the URL of the meme image from the API response
            const imageUrl = res.data[0].data.children[0].data.url;
    
            // Send the meme image to the Discord channel
            message.channel.send(imageUrl);
            });
    }
}