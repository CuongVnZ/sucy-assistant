const Discord = require('discord.js');
const client = new Discord.Client();

// Character creation system

let characters = {};

client.on('message', message => {
    if (message.content.startsWith('!createchar')) {
        let args = message.content.split(' ');
        let charName = args[1];
        let charClass = args[2];
        let charLevel = args[3];
        let charHP = args[4];
        let charAttack = args[5];
        let charDefense = args[6];

        characters[message.author.id] = {
            name: charName,
            class: charClass,
            level: charLevel,
            hp: charHP,
            attack: charAttack,
            defense: charDefense
        };

        message.channel.send(`Character created: ${charName} the ${charClass} (Level ${charLevel})`);
    }
});

// Battle system

client.on('message', message => {
    if (message.content.startsWith('!battle')) {
        let opponent = message.mentions.users.first();
        let opponentChar = characters[opponent.id];
        let playerChar = characters[message.author.id];

        if (!opponentChar || !playerChar) {
            message.channel.send('One or both of the characters are not valid.');
            return;
        }

        while (opponentChar.hp > 0 && playerChar.hp > 0) {
            opponentChar.hp -= playerChar.attack;
            playerChar.hp -= opponentChar.attack;
        }

        if (opponentChar.hp <= 0) {
            message.channel.send(`${playerChar.name} has won the battle!`);
            playerChar.level++;
            playerChar.attack += 2;
            playerChar.defense += 2;
            playerChar.hp = 100;
        } else {
            message.channel.send(`${opponentChar.name} has won the battle!`);
            opponentChar.level++;
            opponentChar.attack += 2;
            opponentChar.defense += 2;
            opponentChar.hp = 100;
        }
    }
});

client.on('message', message => {
    if (message.content.startsWith('!shop')) {
        let output = 'Available items:\n';
        for (let item in shopItems) {
            output += `${item}: ${shopItems[item].price} gold - ${shopItems[item].info}\n`;
        }
        message.channel.send(output);
    }

    if (message.content.startsWith('!buy')) {
        let args = message.content.split(' ');
        let item = args[1];
        let playerChar = characters[message.author.id];
        
        if (!shopItems[item]) {
            message.channel.send('That item is not available.');
            return;
        }
        
        if (playerChar.gold < shopItems[item].price) {
            message.channel.send('You do not have enough gold to buy that item.');
            return;
        }
        
        playerChar.gold -= shopItems[item].price;
        
        if (item === 'health potion') {
            playerChar.hp += 50;
            message.channel.send('You have bought a health potion and restored 50 HP.');
        } else if (item === 'attack boost') {
            playerChar.attack += 5;
            message.channel.send('You have bought an attack boost and increased your attack by 5.');
        } else if (item === 'defense boost') {
            playerChar.defense += 5;
            message.channel.send('You have bought a defense boost and increased your defense by 5.');
        }
    }
});

client.on('message', message => {
    if (message.content === '!map') {
      let output = 'Available maps:\n';
      for (let map in maps) {
        output += `${map}: ${maps[map].description}\n`;
      }
      message.channel.send(output);
    }
  
    if (message.content.startsWith('!explore')) {
      let args = message.content.split(' ');
      let map = args[1];
      let playerChar = characters[message.author.id];
  
      if (!maps[map]) {
        message.channel.send('That map is not available.');
        return;
      }
  
      const mapEmbed = new Discord.MessageEmbed()
        .setTitle(`Map of the ${map}`)
        .setDescription(maps[map].map)
        .setThumbnail(maps[map].thumbnail);
      message.channel.send(mapEmbed);
  
      let enemy = maps[map].enemies[Math.floor(Math.random() * maps[map].enemies.length)];
      message.channel.send(`You have encountered a ${enemy} in the ${map}!`);
    }
  });