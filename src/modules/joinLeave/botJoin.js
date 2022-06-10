const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    async execute(client) {
        client.on("guildCreate", guild => {
            console.log(`Joined a new guild. Name: ${guild.name} \nID: ${guild.id}`)
            let defaultChannel = "";
            guild.channels.cache.forEach((channel) => {
              if(channel.type == "text" && defaultChannel == "") {
                if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                  defaultChannel = channel;
                }
              }
            })
                const newserverembed = new Discord.MessageEmbed()
                  .setDescription('Hello! Thanks for adding me to your server! My name is **' + Distro + '** . \nStart by configuring me to better suit your server like telling me the modlog channels! To do that, run `*setup` . My prefix is `*` . \nCurrently the bot has only a few commands, but don\'t worry! There will soon be more. \nTo give suggestions for the bot, run `*suggestion [suggestion]` and the suggestion will be sent to the bot owners. \nCheck out our currency system too! It\'s currently simple, but don\'t worry! More will be added.')
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Support Server')
                        .setStyle('LINK')
                        .setURL('')
            )
                .addComponents(
                    new MessageButton()
                        .setLabel('Invite')
                        .setStyle('LINK')
                        .setURL('')
            )
                defaultChannel.send(newserverembed);
                client.user.setPresence({ activity: { name: `in `+client.guilds.cache.size+ ` servers` }, type: 'WATCHING', status: 'idle' })
            })
    }
}
