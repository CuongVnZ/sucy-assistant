import OpenAI from 'openai';

const openai = new OpenAI();

export default {
    name: 'gptv',
    description: "ChatGPT Premium",
    async execute(message, args, Discord, client){

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'ada',
        });

        console.log(completion.choices);
    }
}