import axios from 'axios';

export default {
    name: 'random',
    description: "This command generates or displays a random meme.",
    execute(message, args, Discord, client){
        var subreddit = 'dankmemes'
        if (args.length > 0) subreddit = args[0]
        var url = 'https://www.reddit.com/r/' + subreddit + '/random.json'

        // Send a request to the Reddit API to get a random meme from the subreddit
        axios.get(url)
            .then(res => {
                // Get the URL of the meme image from the API response
                const imageUrl = res.data[0].data.children[0].data.url_overridden_by_dest
        
                // Send the meme image to the Discord channel
                message.channel.send(imageUrl);
            });
    }
}