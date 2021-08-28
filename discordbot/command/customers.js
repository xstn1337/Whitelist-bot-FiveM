const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
con.query(`SELECT Blacklisted,Reason FROM whitelistbot WHERE discord_id = '${message.author.id}'`, function (err, results, fields) {
  if(results.length) {
    if(results[0].Blacklisted === "True") {
      let blacklisted = results[0].Blacklisted
      let reason = results[0].Reason
        message.channel.send('You are blacklisted! reason:' + reason + '')
      } else {
        const guild = bot.guilds.cache.get("814065913036668948");
        let roleID = '816629735252951060';
        let memberCount = guild.roles.cache.get(roleID).members.size;
        message.channel.send(memberCount + ' customers')
      }
  } else {
    const guild = bot.guilds.cache.get("814065913036668948");
    let roleID = '816629735252951060';
    let memberCount = guild.roles.cache.get(roleID).members.size;
    message.channel.send(memberCount + ' customers')
  }
  })
}

module.exports.help = {
  name: "customers"
}
