module.exports = {
    async execute(client) {
        client.on('messageDelete', async message => {
            if(safemode == true)return;
            const fetchedLogs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_DELETE',
            });
            // Since we only have 1 audit log entry in this collection, we can simply grab the first one
            const deletionLog = fetchedLogs.entries.first();
        
            // Let's perform a sanity check here and make sure we got *something*
            if (!deletionLog) {
          console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
            const DeletionEmbed = new Discord.MessageEmbed()
            .setColor('#ff1919')
            .setTitle('Message Deleted')
            .addFields(
                { name: 'Message sent by: ', value: message.author.tag, inline: false },
                { name: 'Deleted by: ', value: 'Unknown - Audit log not found.', inline: false },
                { name: 'Sent in: ', value: message.channel.name, inline: false },
                { name: 'Message: ', value: message.content, inline: false },
            )
            .setTimestamp()
          try {
          const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
            const channel = client.channels.cache.get(`${ModLog}`);
            channel.send(DeletionEmbed)
        } catch(error) {
            message.channel.send('Oopsie doopsie, the bot ran into an error. Error code: -2\n More info: Failed to log message delete - modlog channel not configured correctly. Please run `*setup` again.')
            console.log(error)
          }
          }
        
            // We now grab the user object of the person who deleted the message
            // Let us also grab the target of this action to double check things
            const { executor, target } = deletionLog;
        
        
            // And now we can update our output with a bit more information
            // We will also run a check to make sure the log we got was for the same author's message
            if (target.id === message.author.id) {
                console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`)
                const DeletionEmbed = new Discord.MessageEmbed()
                .setColor('#ff1919')
                .setTitle('Message Deleted')
                .addFields(
                    { name: 'Message sent by', value: message.author.tag, inline: false },
                    { name: 'Deleted by', value: executor.tag, inline: false },
                    { name: 'Sent in', value: message.channel.name, inline: false },
                    { name: 'Message', value: message.content, inline: false },
                )
                .setTimestamp()
            try {
            const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
                const channel = client.channels.cache.get(`${ModLog}`);
                channel.send(DeletionEmbed)
                return;
            } catch(error) {
                message.channel.send('Oopsie doopsie, the bot ran into an error. Error code: -2\n More info: Failed to log message delete - modlog channel not configured correctly. Please run `*setup` again.')
                console.log(error)
              }
            }	else {
                if (target.id === message.author.id) return;
                console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`)
                const DeletionEmbed = new Discord.MessageEmbed()
                .setColor('#ff1919')
                .setTitle('Message Deleted')
                .addFields(
                    { name: 'Message sent by', value: message.author.tag, inline: false },
                    { name: 'Deleted by', value: 'Unknown - Unable to find who deleted message. - May occur when the message author erases their own message', inline: false },
                    { name: 'Sent in', value: message.channel.name, inline: false },
                    { name: 'Message', value: message.content, inline: false },
                )
                .setTimestamp()
            try {
            const ModLog = db.fetch(`ModlogID_${message.guild.id}`)
                const channel = client.channels.cache.get(`${ModLog}`);
                channel.send(DeletionEmbed)
                return;
            } catch(error) {
                message.channel.send('Oopsie doopsie, the bot ran into an error. Error code: -2\n More info: Failed to log message delete - modlog channel not configured correctly. Please run `*setup` again.')
                console.log(error)
              }
            }
        });
    }
}