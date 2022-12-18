const Task = require('../Task.js');

const NewsAPI = require('newsapi');

const newsapi = new NewsAPI('c678e618580f4cb8b888dd09911f56a4');

module.exports = (Discord, client) => {
    let task = new Task(Discord, client)
    run(Discord, client)
    setInterval(run, 10000, Discord, client)
}

function run(Discord, client){
    console.log('[INFO] Checking for new articles...')
    for (var guild of client.sucy.guilds) {
        var lastArticleId = guild.features.newsNotice.lastArticleId;
        try {
        
            // Retrieve the latest technology articles from the NewsAPI
            newsapi.v2.topHeadlines({
              category: 'technology',
              language: 'en',
              country: 'us'
            }).then(response => {
                // Get the last article information
                var article = response.articles[0];
                // Check if the latest article is different from the previous one
                if (article.title !== lastArticleId) {
                    // Create a new Discord embed message
                    let embed = new Discord.EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle(article.title)
                        .setURL(article.url)
                        .setDescription(article.description)
                        .setThumbnail(article.urlToImage)
                        .setTimestamp(new Date(article.publishedAt))
                        .setFooter({ text: article.source.name, iconURL: article.urlToImage });
                    // Send a notification to the channel
                    channel = client.channels.cache.get('1053990394565775370');
                    channel.send({embeds: [embed]});
            
                    // Update the last article ID
                    guild.features.NewsNotice.lastArticleId = article.title;
                }
            });
            
        } catch (error) {
            console.log(error)
        }
        
    }

    console.log('[INFO] Done')
}