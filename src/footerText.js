module.exports = {
    async execute(client) {
        client.on('message', message => {
            try {
            if(message.channel.type == 'dm') return;
            const mod = db.fetch(`ModeratorRoleID_${message.guild.id}`)
            if(mod == null) {
                footertext = Distro + ' is not activated, run *setup to activate \n' + '' + Distro + '' + version + '\nCodename: ' + codename +'\n#peaceforukraine'
            }else if(message.channel.type == 'dm') {
                footertext = Distro + ' ' + version +'\nCodename: '+ codename +'\n#peaceforukraine'
            } else {
                footertext = Distro + ' ' + version +'\nCodename: '+ codename +'\n#peaceforukraine'
            }
            }catch(error) {
                footertext = Distro + ' is not activated, run *setup to activate \t '+ Distro + version + '\nCodename: ' + codename +'\n#peaceforukraine'
                fs.appendFileSync('../../logs/errors.log', error+'\n')
            }
        })
    }
}