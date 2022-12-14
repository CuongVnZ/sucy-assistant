const Werewolf = require("./werewolf/Werewolf")

module.exports = (Discord, client) => {
    client.sucy.werewolf = new Werewolf(Discord, client);
}