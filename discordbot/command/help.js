const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
con.query(`SELECT Blacklisted,Reason FROM whitelistbot WHERE discord_id = '${message.author.id}'`, function (err, results, fields) {
  if(results.length) {
    if(results[0].Blacklisted === "True") {
      let blacklisted = results[0].Blacklisted
      let reason = results[0].Reason
      return message.channel.send('You`re blacklisted ;c reason: ' + reason)
      } else {
        let Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('**Help**')
        .setDescription(`**$info** - list of key assigned to your account \n**$expire** - validity of your license \n**$ping** - informations about ping (API, BOT) \n**$setip** - only for stuff\n**$website** - our website \n**$customers** - shows number of clients`)
        .setTimestamp()
        message.channel.send(Embed)
      }
  } else {
    let Embed = new discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('**Help**')
    .setDescription(`**$info** - list of key assigned to your account \n**$expire** - validity of your license \n**$ping** - informations about ping (API, BOT) \n**$setip** - only for stuff\n**$website** - our website \n**$customers** - shows number of clients`)
    .setTimestamp()
    message.channel.send(Embed)
  }
  })
}

module.exports.help = {
  name: "help"
}
