// const TicketManager = require('../features/TicketSystem/TicketManager')
import { createTicket } from '../features/TicketSystem/TicketManager.js'

export default {
    name: "ticket",
    aliases: [],
    Permissions: [],
    description: "open a ticket!",
    async execute(message, args, Discord, client) {
        createTicket(message, args, Discord, client)
    }
}
