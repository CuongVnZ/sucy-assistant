import mongoose from 'mongoose';

// Define the schema for the JSON data
export default new mongoose.Schema({
    name: String,
    id: String,
    prefix: String,
    features: {
        reactions: {
        messages: [{
            id: String,
            roles: [String],
            symbols: [String]
        }]
        },
        ticketSystem: {
            generalChannelId: String,
            categoryId: String
        },
        stickyStats: {
            voice_channels: [{
                id: String,
                text: String
            }]
        },
        newsNotice:{
            lastArticleId: String,
            channelId: String,
        }
    }
});