const NewsNotice = require('./tasks/NewsNotice');
const OnlineStatus = require('./tasks/OnlineStatus');

module.exports = (Discord, client) => {
    //setup tasks
    OnlineStatus(Discord, client);
    // NewsNotice(Discord, client);
}