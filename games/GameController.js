const Werewolf = require("./werewolf/Werewolf")

module.exports = (Discord, client) => {
    client.werewolf = new Werewolf;
    
}