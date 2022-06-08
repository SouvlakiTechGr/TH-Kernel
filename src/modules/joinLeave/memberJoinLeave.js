module.exports = {
    async execute(client) {
        //Member join
client.on('guildMemberAdd', member => {
	if(fs.existsSync('./safe_mode.flag'))return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
		if (!fs.existsSync(process.env.HOME+`/logs/${member.guild.id}_user.log`)) {
			fs.appendFileSync(process.env.HOME+`/logs/${member.guild.id}_user.log`, `__USER LOG CREATED ${dateTime}__\n\n`)
		}
	fs.readFile(process.env.HOME+`/logs/${member.guild.id}_user.log`, function(err, data){
		if(err){
			errorlog(err)
			console.error
		}
		const guild = member.guild
		const UserLog = db.fetch(`UserlogID_${member.guild.id}`)
		const channel = client.channels.cache.get(UserLog)
		const icon = member.user.displayAvatarURL()
		if (!channel) return;
			if(data.toString().includes(member.id)){
			const joinedbefore = 'True.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		}else{
			const joinedbefore = 'False.'
			console.log(joinedbefore)
			welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore)
		}
		
		fs.appendFileSync(process.env.HOME+`/logs/${member.guild.id}_user.log`, `${member.user.tag} (${member.id}) joined at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
		
		function welcomeEmbedUserLog(dateTime, channel, guild, icon, member, joinedbefore){
        const MemberJoinEmbed = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setTitle('Member Join')
		.setThumbnail(`${icon}`)
		.addFields(
			{ name: 'Member', value: `<@${member.id}>`, inline: false },
			{ name: 'Username', value: member.user.tag, inline: false },
			{ name: 'ID', value: member.id, inline: false },
			{ name: 'Joined before?', value: joinedbefore, inline: false },
			{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
			{ name: 'Account creation', value: member.user.createdAt, inline: false },
		)
		.setTimestamp()
		try {
		const channeltosend = client.channels.cache.get(UserLog)
		channeltosend.send(MemberJoinEmbed)
		}catch(error) {
			console.log(error)
		}
	}
	})
		if(AssignMemberRoleOnJoin == true){
			const role = member.guild.roles.cache.find(role => role.id === `${MemberRoleID}`);
			member.roles.add(role);
		}
	});


//Member leave
client.on('guildMemberRemove', member => {
	if(safemode == true)return;
	var today = new Date();
	var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;
  const guild = member.guild
	const icon = member.user.displayAvatarURL({ dynamic: true })
	fs.appendFileSync(process.env.HOME+`/logs/${member.guild.id}_user.log`, `${member.user.tag} (${member.id}) left at '${dateTime}'.\nAccount creation date: ${member.user.createdAt}\nCurrent guild user count: ${guild.memberCount}\n\n`)
	const MemberLeaveEmbed = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setTitle('Member Leave')
	.setThumbnail(`${icon}`)
	.addFields(
		{ name: 'Username', value: member.user.tag, inline: false },
		{ name: 'Member ID', value: member.user.id, inline: false },
		{ name: 'Account creation date', value: member.user.createdAt, inline: false },
		{ name: 'Server member count', value: `${guild.memberCount}`, inline: false },
	)
	.setTimestamp()
  try {
  const UserLog = db.fetch(`UserlogID_${member.guild.id}`)
  const channel = client.channels.cache.get(UserLog)
	channel.send(MemberLeaveEmbed)
  } catch(error) {
    console.log(error)
  }
});
    }
}