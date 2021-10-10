const Roles = require('./Roles.js');

class Player {
    constructor(Discord, client, user) {
        this.Discord = Discord;
        this.user = user;
        this.client = client;

        this.life = 1;
        this.role = Roles.VILLAGER;
    }
}

module.exports = Player;