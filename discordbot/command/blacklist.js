const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
 if(message.member.roles.cache.some(role => role.name === 'DEV | CEO')){
    if(args[1]) {
      if(args[2]) {
        let reasons = args.slice(2).join(" ")
        con.query(`SELECT discord_id,Blacklisted FROM whitelistbot WHERE discord_id = '${args[1]}'`, function (err, results, fields) {
        if(results.length) {
            con.query(`SELECT Blacklisted FROM whitelistbot WHERE discord_id = '${args[1]}'`, function (err, results, fields) {
              if(results[0].Blacklisted !== "True") {
                con.query(`Update whitelistbot Set Blacklisted = 'True', Reason = '${reasons}', hwid = '${makeid(25)}' Where discord_id = '${args[1]}'`, function (err, results, fields) {
                  const Embed = new discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setDescription('**xstn.xyz**')
                  .addField('Success',"```\nBlacklisted User "+args[1]+" Success\nReason "+reasons+"\n```", true)
                  .setTimestamp()
                  message.channel.send(Embed)
                  log(`[LOG Command] ${message.author.username}, Use Command Blacklisted`, "green")
                })
                } else {
                const Embed1 = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription('**xstn.xyz**')
                .addField('Fail',"```\nThe user has been blacklisted\n```", true)
                .setTimestamp()
                message.channel.send(Embed1)
              }
            })
          } else {
              const Embed = new discord.MessageEmbed()
              .setColor('#0099ff')
              .setDescription('**xstn.xyz**')
              .addField('Error',"```\n"+args[1]+" User Not Have Whitelist\n```", true)
              .setTimestamp()
              message.channel.send(Embed)
          }
        })
      } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**xstn.xyz**')
        .addField('Error','```\nPlease Send Reason\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
      }
    } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**xstn.xyz**')
        .addField('Error','```\nPlease Send Id Disord\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
    }
    } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**xstn.xyz**')
        .addField('Error','```\nAre You Not DEV | CEO\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
        log(`[LOG Command] ${message.author.username}, Use Command Add Whitelist`, "red")
    }
}

module.exports.help = {
  name: "blacklist"
}