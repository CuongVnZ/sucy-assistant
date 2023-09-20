import OpenAI from 'openai';

const API_KEY = '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'

const openai = new OpenAI({
    apiKey: API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});


export default {
    name: 'gpt',
    description: "GPT-3 Chatbot",
    async execute(message, args, Discord, client){

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'ada',
        });

        console.log(completion.choices);
    }
}