const NewsNotify = require('./tasks/NewsNotify');
const OnlineCounting = require('./tasks/OnlineCounting');

module.exports = (Discord, client) => {
    //setup other tasks

    //add OnlineCounting task
    OnlineCounting(Discord, client);
    NewsNotify(Discord, client);
}