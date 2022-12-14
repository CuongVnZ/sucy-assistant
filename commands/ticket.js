const TicketManager = require('../features/TicketSystem/TicketManager')

module.exports = {
    name: "ticket",
    aliases: [],
    Permissions: [],
    description: "open a ticket!",
    async execute(message, args, Discord, client) {
        TicketManager.createTicket(message, args, Discord, client)
    }
}
