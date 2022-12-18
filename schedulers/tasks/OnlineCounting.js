const Task = require('../Task.js');

module.exports = (Discord, client) => {
    task = new Task(Discord, client)
    setInterval(run, 60000, Discord, client)
}

function run(Discord, client){
    console.log('[INFO] Updating task...')

    try {
        const guilds = client.guilds.cache;
        online = 0
        //totalUsers = guild.members.size
        guilds.forEach(async (guild) => {//891536512934608937
            let guildMembers = await guild.members.fetch({ withPresences: true })
            var onlineMembers = await guildMembers.filter(member => {
                if(member.presence == null) return
                return !member.user.bot && member.presence.status != "offline"
            })

            const channels = []

            const totalUsers = await client.channels.cache.get('899750985654751313');
            const onlineUsers = await client.channels.cache.get('1052612155314282506');
            const thptCount = await client.channels.cache.get('899597397087358987');

            date = new Date("2022/06/07")
            days = Math.round((date-Date.now())/(60*60*24*1000))

            await onlineUsers.setName("Online: " + onlineMembers.size)
            await totalUsers.setName("Total users: " + guild.memberCount)
            await thptCount.setName("THPT QG: " + days + " ngày")
        });
    } catch (error) {
            
    }

    console.log('[INFO] Done')
}