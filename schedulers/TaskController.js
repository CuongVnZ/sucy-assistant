const NewsNotice = require('./tasks/NewsNotice');
const OnlineCounting = require('./tasks/OnlineCounting');

module.exports = (Discord, client) => {
    //setup other tasks

    //add OnlineCounting task
    OnlineCounting(Discord, client);
    NewsNotice(Discord, client);
}