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
            con.query(`SELECT userkey,hwid,ip,Blacklisted,created_at,redeemed FROM whitelistbot WHERE discord_id = '${message.author.id}'`, function(err, results, fields) {
              let userkey = results[0].userkey
              let hwids = results[0].hwid
              let ips = results[0].ip
              let created_at = results[0].created_at
              let redeemed = results[0].redeemed
              const Embed = new discord.MessageEmbed()
              .setColor('#0099ff')
              .setDescription('**xstn.xyz**')
              .addField('Informations', '```List of keys assigned to your account.``` \n **Key** \n`' + userkey + '` \n`Redeemed: ' + redeemed + '` \n **IP** \n `' + ips + '`\n')
              .setTimestamp()
              message.channel.send(`${message.author}, your informations about key sended in dm`).then(msg => msg.delete({timeout: 10000}))
              message.author.send(Embed).catch(error => {
                  const embed = new discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setDescription('**xstn.xyz**')
                  .addField('Send Message Fail','```\nI cannot message you, open your messages!\n```', true)
                  .setTimestamp()
                  message.channel.send(embed)
              })
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
  name: "info"
}
