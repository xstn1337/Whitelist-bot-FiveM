const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
   if(message.member.roles.cache.some(role => role.name === 'DEV | CEO')){
      if(args[1]) {
          con.query(`Select discord_id FROM whitelistbot Where discord_id = '${args[1]}'`, function(err, results, fields) {
          if(!results.length) {
          const Embed = new discord.MessageEmbed()
          .setColor('#0099ff')
          .setDescription('**Bot Whitelist**')
          .addField('Error','```\nAre You Not Whitelist\n```', true)
          .setTimestamp()
          message.channel.send(Embed)
            log(`[LOG Command] ${message.author.username}, Use Command Reset Hwid`, "red")
          } else {
          con.query(`Update whitelistbot Set Blacklisted = 'False', Reason = 'Unknown' Where discord_id = '${args[1]}'`, function(err, results, fields){
              const Embed = new discord.MessageEmbed()
              .setColor('#0099ff')
              .setDescription('**Bot Whitelist**')
              .addField('Success','```\nUnBlacklist Success\n```', true)
              .setTimestamp()
              message.channel.send(Embed)
              log(`[LOG Command] ${message.author.username}, Use Command UnBlacklist`, "green")
          })
          }
        })
      } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**Bot Whitelist**')
        .addField('Error','```\nPlease Send Id Disord\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
      }
    } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**Bot Whitelist**')
        .addField('Error','```\nAre You Not DEV | CEO\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
    }
}

module.exports.help = {
  name: "unblacklist"
}