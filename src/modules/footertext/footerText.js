module.exports = {
    async execute(client) {
        client.on('message', message => {
            try {
            if(message.channel.type == 'dm') return;
            const mod = db.fetch(`ModeratorRoleID_${message.guild.id}`)
            if(mod == null) {
                footertext = 'TH-Kernel is not activated, run *setup to activate \nTH-Kernel distribution ' + version + '\nCodename: ' + codename +'\n#peaceforukraine'
            }else if(message.channel.type == 'dm') {
                footertext = 'TH-Kernel '+ version +'\nCodename: '+ codename +'\n#peaceforukraine'
            } else {
                footertext = 'TH-Kernel '+ version +'\nCodename: '+ codename +'\n#peaceforukraine'
            }
            }catch(error) {
                footertext = 'TH-Kernel is not activated, run *setup to activate \tTH-Kernel distribution ' + version + '\nCodename: ' + codename +'\n#peaceforukraine'
                fs.appendFileSync('../../logs/errors.log', error+'\n')
            }
        })
    }
}