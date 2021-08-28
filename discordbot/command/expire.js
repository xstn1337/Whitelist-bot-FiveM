const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
  con.query(`SELECT discord_id,Blacklisted,Reason FROM whitelistbot WHERE discord_id = '${message.author.id}'`, function (err, results, fields) {
    message.delete()
      if(results.length) {
        if(results[0].Blacklisted === "True") {
          let blacklisted = results[0].Blacklisted
          let reason = results[0].Reason
            message.channel.send('You`re blacklisted, reason: ' + reason)
        } else {
            con.query(`SELECT userkey,ip,expire_at FROM whitelistbot WHERE discord_id = '${message.author.id}'`, function(err, results, fields) {
              let userkey = results[0].userkey
              let ips = results[0].ip
              let expire_at = results[0].expire_at
              message.channel.send('<@' + message.author + '> Here your valid license:\n```' + expire_at + ' > xstn.xyz```')
            })
        }
      } else {
          const Embed = new discord.MessageEmbed()
          .setColor('#0099ff')
          .setDescription('**xstn.xyz**')
          .addField('Error','```\nYou dont have any key!\n```', true)
          .setTimestamp()
          message.channel.send(Embed).then(msg => msg.delete({timeout: 10000}))
      }
  })
}

module.exports.help = {
  name: "expire"
}
