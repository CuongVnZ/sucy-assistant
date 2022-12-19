// Set up an array of responses for the 8-ball
const responses = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
  ];

module.exports = {
    name: '8ball',
    description: "This is an 8-ball command that allows you to ask a question and receive a random answer from a predefined list of responses. The 8-ball is often used to provide guidance or make decisions when faced with uncertainty.",
    execute(message, args, Discord, client){
    // Get the question from the message
    const question = args.join(" ");
    
    if (!question) return message.channel.send("Please ask a question.");

    // Use the Discord.js RichEmbed constructor to create a new embed
    const embed = new Discord.EmbedBuilder()
      // Set the title to the question
      .setTitle(`Question: ${question}`)
      // Set the color to a random color
      .setColor(Math.floor(Math.random() * 16777215))
      // Set the description to a random response from the responses array
      .setDescription(responses[Math.floor(Math.random() * responses.length)]);

    // Send the embed to the same channel as the original message
    message.channel.send({ embeds: [embed] });
    }
}