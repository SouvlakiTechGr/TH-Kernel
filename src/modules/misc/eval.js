module.exports = {
    async execute(client) {
        function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
          client.on("message", message => {
            const args = message.content.split(" ").slice(1);
        
              if (message.content.startsWith(PREFIX + "eval")) {
                  if (message.author.id !== OwnerID || message.author.id !== BotManagerRoleID) { respond('❌ Bot Manager Command Only', 'This command can only be executed by the bot owner.', message.channel); return; }
              try {
                const code = args.join(" ");
                let evaled = eval(code);
        
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
        
                respond('⌨️ Eval Command Result',clean(evaled), message.channel);
              } catch (err) {
                respond('⌨️ Eval Command Error',`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, message.channel);
              }
            }
        })
    }
}