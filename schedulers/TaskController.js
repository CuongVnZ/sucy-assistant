// const NewsNotice = require('./tasks/NewsNotice');
// const OnlineStatus = require('./tasks/OnlineStatus');
import NewsNotice from './tasks/NewsNotice.js';
import OnlineStatus from './tasks/OnlineStatus.js';

export default (Discord, client) => {
    //setup tasks
    OnlineStatus(Discord, client);
    // NewsNotice(Discord, client);
}