module.exports = {
    VILLAGER: {
        name: 'Dân làng',
        description: 'The Villagers have no special abilities and must find the Werewolves and eliminate them.',
        life: 1
    },
    SEER: {
        name: 'Seer',
        description: 'The Seer is a Villager that may check if a player is a Werewolf or Villager each night.',
        life: 1
    },
    WEREWOLF: {
        name: 'Ma sói',
        description: 'The Werewolves choose a player each night to eliminate. They win when they outnumber the remaining Villagers.',
        life: 1
    },
    BODYGUARD: {
        name: 'Bảo vệ',
        description: 'The Bodyguard is a Villager that may choose to protect a player from elimination every night.',
        life: 2
    }
}