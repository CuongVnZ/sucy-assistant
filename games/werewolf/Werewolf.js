const Game = require('./Game.js')

class Werewolf{
    constructor(Discord, client) {
        this.Discord = Discord;
        this.client = client;
    }

    games = [];

    create(){
        var game = new Game(this.Discord, this.client)
        this.games.push(game);
        return game;
    }

    remove(game){
        //remove game from games
    }
}

module.exports = Werewolf;