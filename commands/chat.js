
module.exports = {
    name: 'gpt',
    description: "GPT-3 Chatbot",
    execute(message, args, Discord, client){
        chat = args[0]
        const { GPT3 } = require('gpt-3-api');
        const gpt3 = new GPT3(process.env.GPT3_API_KEY);
        gpt3
        .complete({
            prompt: chat,
            maxTokens: 100,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
        });
    }
}