module.exports = {
    name: 'graph',
    description: "this is a test command!",
    async execute(message, args, Discord, client){
        var canvas = await graphCanvas(args[0])

        // const attachment = new Discord.Attachment(canvas.toBuffer(), 'exp.png'); //buffer the canvas and pass it into an Attachment constructor

        // const myEmbed = new Discord.RichEmbed()
        // .setTitle(`Đồ thị**`)
        // .setDescription(`**Test`)
        // .setColor("1752220")
        // .setImage(attachment); //this is where we use the buffered image

        // message.channel.send(myEmbed);
    }
}

const vegaEXP = require('vegaexp');

function graphCanvas(exp){
    new vegaEXP(exp).then((canvas) =>{
        fs.writeFileSync('./coolimage.png', canvas.toBuffer())
        return canvas;
    })
}
