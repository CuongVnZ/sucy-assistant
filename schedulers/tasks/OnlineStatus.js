export default (client) => {
    run(client)
    setInterval(run, 60000, client)
}

function run(client){
    console.log('[INFO] Updating OnlineStatus channel...')

    try {
        const guilds = client.guilds.cache;
        var online = 0
        guilds.forEach(async (guild) => {//891536512934608937
            let guildConfigs = await client.sucy.guilds
            for (var guildConfig of guildConfigs) {
                if (guildConfig.id == guild.id) {

                    let guildMembers = await guild.members.fetch({ withPresences: true })
                    var onlineMembers = await guildMembers.filter(member => {
                        if(member.presence == null) return
                        return !member.user.bot && member.presence.status != "offline"
                    })

                    const channels = []

                    // const totalUsers = await client.channels.cache.get('899750985654751313');
                    const onlineUsers = await client.channels.cache.get('1052612155314282506');
                    // const thptCount = await client.channels.cache.get('899597397087358987');

                    // date = new Date("2022/06/07")
                    // days = Math.round((date-Date.now())/(60*60*24*1000))

                    await onlineUsers.setName("Online: " + onlineMembers.size + "/" + guild.memberCount)
                    // await totalUsers.setName("Total users: " + guild.memberCount)
                    // await thptCount.setName("THPT QG: " + days + " ngày")
                }
            }
        });
    } catch (error) {
            console.log(error)
    }

    console.log('[INFO] Updated OnlineStatus channel.')
}