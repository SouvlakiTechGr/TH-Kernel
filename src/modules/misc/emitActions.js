module.exports = {
    async execute(client) {
        client.on("StartupIssue", () => {
            var today = new Date();
            fs.readFile('./errorcount.txt', function(err, data){
                if(err){
                    fs.writeFileSync('../../errorcount.txt',0+1);
                }else{
                    fs.writeFileSync('../../errorcount.txt',Number(data)+1);
                }
            })
            var titleofstartup = 'Bot Started - Issue Detected'
            var descriptionofstartup = 'The bot loaded successfully, but restarted unexpectedly.'
            if(safemode == true){
                var titleofstartup = 'Bot Started - Safe Mode'
                var descriptionofstartup = 'The bot was unable to start normally multiple times, so it entered safe mode.'
            }
        
                var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date+' '+time;
                const StartupEmbed = new Discord.MessageEmbed()
                .setColor('#ffa900')
                .setTitle(titleofstartup)
                .setDescription(descriptionofstartup)
                .setTimestamp()
                .setFooter(footertext)
                modlog = client.channels.cache.get(`${BotLog}`);
                modlog.send(StartupEmbed);
        
                return
        })
        
        client.on('StartupPassed', () => {
            if (fs.existsSync('./errorcount.txt')){
                fs.unlinkSync(`./errorcount.txt`)
            }
            var today = new Date();
            var date = today.getMonth()+1+'-'+(today.getDate())+'-'+today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            var footertext = 'botOS '+ version +'\nCodename: '+ codename +'\nRemember to wash your hands regularly!\nStay safe during the COVID-19 period!'
            const StartupEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Bot Started')
                .setDescription(`Bot has started successfully.`)
                .setTimestamp()
                .setFooter(footertext)
            modlog = client.channels.cache.get(`${BotLog}`);
            modlog.send(StartupEmbed);
            //fs.writeFileSync('../../runstate.txt', 'running')
            return;
        })
        
    }
}