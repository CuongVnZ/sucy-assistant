const wiki = require('wikipedia');

module.exports = {
    name: "wiki",
    description: "Displays wiki commands",
    async execute(message, args, Discord, client){
        var query = args.join(" ");
        if(query == ""){
            message.channel.send("Please enter a search query");
            return;
        }
        try {
            let result = await searchWiki(query);
            //result = JSON.parse(result);
            if(result.length == 0){
                message.channel.send("No results found");
                return;
            }
            // console.log(result);
            let embed = new Discord.EmbedBuilder()
                .setTitle(result.title)
                .setURL(result.content_urls.desktop.page)
                .setDescription(result.extract)
                .setColor("#0099ff")
                .setFooter({ text: "Powered by Wikipedia", iconURL: 'https://en.wikipedia.org/static/images/project-logos/enwiki-1.5x.png' })
                .setTimestamp();
            if(result.thumbnail){
                embed.setThumbnail(result.thumbnail.source);
            }
            message.channel.send({ embeds: [embed] });
        } catch (error) {  
            console.log(error);
            message.channel.send("Wiki not found");
        }
    }
}

async function searchWiki(query){
	try {
		const newUrl = await wiki.setLang('vi');
        const search = await wiki.search(query);
        const page = await wiki.page(search.results[0].title);
        const summary = await page.summary();
		return summary;
	} catch (error) {
		console.log(error);
        
	}
}

