const Player = require('./Player.js')
class Game {
    constructor(Discord, client){
        this.Discord = Discord;
        this.client = client;

        this.players = []

        this.isStarted = false;

        this.gameDay = 1;
    }

    addPlayer(user){
        var player = new Player(this.Discord, this.client, user);
        this.players.push(player);
        return player;
    }

    removePlayer(player){
        this.players = this.players.filter((el) => {
            return el != player
        })
        return true;
    }

    start(){
        if(this.isStarted){
            return
        }else{
            this.isStarted = true
        }
        console.log("Werewolf started!")
        setInterval()
    }

    end(){
        //Kick all player
        console.log("Werewolf end!")
    }



}

module.exports = Game;