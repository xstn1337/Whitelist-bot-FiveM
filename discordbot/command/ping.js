const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
con.query(`SELECT Blacklisted,Reason FROM whitelistbot WHERE discord_id = '${message.author.id}'`, function (err, results, fields) {
  if(results.length) {
    if(results[0].Blacklisted === "True") {
      let blacklisted = results[0].Blacklisted
      let reason = results[0].Reason
        message.channel.send('You are blacklisted! reason:' + reason + '')
      } else {
        message.channel.send(`BOT: ${Date.now() - message.createdTimestamp}ms. \nAPI: ${Math.round(bot.ws.ping)}ms.` )
      }
  } else {
    message.channel.send(`BOT: ${Date.now() - message.createdTimestamp}ms. \nAPI: ${Math.round(bot.ws.ping)}ms.` )
  }
  })
}

module.exports.help = {
  name: "ping"
}
