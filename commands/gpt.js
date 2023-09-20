import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

export default {
    name: 'gpt',
    description: "ChatGPT",
    async execute(message, args, Discord, client){
        const api = new ChatGPTUnofficialProxyAPI({
            accessToken: 'sd'
        })

        const res = await api.sendMessage('Hello World!')
        console.log(res.text)
    }
}