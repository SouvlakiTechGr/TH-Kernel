const messageDelete = require("./messageDelete");

module.exports = {
    async execute(client) {
        client.on('messageUpdate', (oldMessage, newMessage) => {
            channel.createWebhook({
                name: 'Logging',
                avatar: 'https://i.imgur.com/AfFp7pu.png',
            })
                .then(webhook => console.log(`Created webhook ${webhook}`))
                .catch(console.error);
          if(oldMessage.channel.dm) return;
            if(safemode == true)return;
            if (oldMessage.author.bot)return;
            const old = oldMessage.toString()
            const newmsg = newMessage.toString()
            if(old == newmsg) return;
          if(oldMessage == newMessage) return;
            var today = new Date();
            var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            if (oldMessage === newMessage)return;
            var ref = "http://discordapp.com/channels/" + oldMessage.guild.id + "/" + oldMessage.channel.id + "/" + oldMessage.id;
            const MessageEditEmbed = new Discord.MessageEmbed()
            .setColor('#ffff33')
            .setTitle('Message Edit')
            .addFields(
                { name: 'Channel sent: ', value: oldMessage.channel.name, inline: false },
                { name: 'Message author: ', value: oldMessage.author.tag, inline: false },
                { name: 'Old message: ', value: oldMessage, inline: true },
                { name: 'Updated message: ', value: newMessage, inline: true },
                { name: 'Message link: ', value: `[Jump](${ref})`, inline: false },
        
            )
            .setTimestamp()
          try {
          const ModLog = db.fetch(`ModlogID_${newMessage.guild.id}`)
            const channel = client.channels.cache.get(`${ModLog}`);
            channel.send(MessageEditEmbed);
        } catch(error) {
            oldMessage.channel.send('Oopsie doopsie, the bot ran into an error. Error code: -2\n More info: Error logging message edit - modlog channel not configured correctly. Please run `*setup` again.')
          }
        
        })
    }
}