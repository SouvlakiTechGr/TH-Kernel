module.exports = {
    async execute(client) {
        client.on('message', async message => {
            if (!message.content.startsWith(PREFIX) || message.author.bot) return;
                const args = message.content.slice(PREFIX.length).split(/ +/);
                const commandName = args.shift().toLowerCase();
                const command = client.modcommands.get(commandName)
                    || client.modcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                var restrictions = require('../../restrictions.json');
                var channelRestrictions = restrictions[0];
                var commandDisabled = restrictions[1];
                var commandEssential = restrictions[2];
            if(!command){
                return;
            }
        
            if(safemode == true && commandEssential && !commandEssential[command.name] == true){
                if(!command.name.includes('help')){
                    return;
                }
            }
            //Command disabled
            if (commandDisabled[command.name] == true) {
                respond('🛑 Command disabled',`<@${message.author.id}>, the command you are trying to run is unavailable at the moment. Please try again later.`, message.channel)
                return;
            }
            //Bot Manager (over mod)
            if(command.botmanager == true && !message.member.roles.cache.some(role => role.id == BotManagerRoleID)) {
                if(message.content.startsWith(PREFIX+'')) return;
                if(message.content.startsWith(PREFIX+' ')) return;
                respond('❌ Bot Manager Command Only', 'This command can only be ran by the bot managers.', message.channel)
                return;
            }
            if(command.botmanager == true && message.member.roles.cache.some(role => role.id === `${BotManagerRoleID}`)){
                command.execute(message, args, client);
                return;
            }
          const ModeratorRoleID = db.fetch(`ModeratorRoleID_${message.guild.id}`)
            //Mod command and no permission
                if (command.mod && !message.member.roles.cache.some(role => role.id === `${ModeratorRoleID}`)) {
                    if(command.botmanager == true) {
                        if(message.content.startsWith(PREFIX+'')) return;
                        if(message.content.startsWith(PREFIX+' ')) return;
                        respond('❌ Bot Manager Command Only', 'This command can only be ran by the bot managers.', message.channel)
                        return;
                    }
                    const result = db.fetch(`DevToolsStatus_${message.author.id}`)
                    if (result == 'true') return;
                    if(message.content.startsWith(PREFIX+'')) return;
                    if(message.content.startsWith(PREFIX+' ')) return;
                    respond('🛑 Incorrect permissions',`<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel)
                    return;
            }
            
            //Channel not allowed
                if (channelRestrictions[command.name] && !channelRestrictions[command.name].includes(message.channel.id)) {
                    respond('🛑 Incorrect permissions',`<@${message.author.id}>, you don't seem to have the correct permissions to use this command or you can't run this command in this channel. Please try again later.`, message.channel)
                    return;
                }
        
            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }
        
            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;
        
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    respond('⏲️',`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`, message.channel);
                    return;
                }
            }
        
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        
        
            //Normal
            try {
            //Checks if maintenance mode is enabled
            const db = require('quick.db')
            const status = db.fetch(`MaintenanceMode`)
            if(status == 'true') {
              if(message.member.roles.cache.some(role => role.id === BotManagerRoleID)) {
                return command.execute(message, args, client, this);
              }
              const maintenanceembed = new Discord.MessageEmbed()
              .setDescription('❌ Maintenance mode is enabled.')
              message.channel.send(maintenanceembed);
            } else {
              //Checks if bot banned
            fs.readFile('./botbanned.txt', function(err, data){
                const blacklistdata = data
                if(data && data.toString().includes(message.author.id)){
                    message.channel.send('You\'re bot banned. This means that you are banned from using the bot. To appeal, fill up this form: https://forms.gle/qPRc98CW3aup9Jm38')
                    return;
            
            } else {
              command.execute(message, args, client, this);
              if(message.channel.type == 'dm') return;
              const mod = db.fetch(`ModeratorRoleID_${message.guild.id}`)
              if(mod == null) {
                  message.channel.send('TH-Kernel is not activated. Please run `*setup` to activate.')
              }
            }
          })
            }
        
            } catch (error) {
                console.error(error);
                respond('Error', 'Something went wrong.\n'+error, message.channel)
        
        
        }
        })
    }
}