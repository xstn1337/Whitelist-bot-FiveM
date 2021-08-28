const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
 if(message.member.roles.cache.some(role => role.name === 'CUSTOMER')){
    if(args[1]) {
        let ipnowe = args.slice(2).join(" ")
        con.query(`SELECT userkey,redeemed FROM whitelistbot WHERE userkey = '${args[1]}'`, function (err, results, fields) {
        if(results.length) {
          if(results[0].redeemed !== "True") {
                con.query(`Update whitelistbot Set redeemed = 'True' Where userkey = '${args[1]}'`, function (err, results, fields) {
                  const Embed = new discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setDescription('**xstn.xyz**')
                  .addField('Redeem','```Successfully redeemed a key: ' + args[1] + '```', true)
                  .setTimestamp()
                  message.channel.send(Embed)
                  log(`[LOG Command] ${message.author.username}, Use Command redeem`, "green")
                })
              } else {
                const Embed = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription('**xstn.xyz**')
                .addField('Error',"```You have redeemed your key!\n```", true)
                .setTimestamp()
                message.channel.send(Embed)
            }
          } else {
              const Embed = new discord.MessageEmbed()
              .setColor('#0099ff')
              .setDescription('**xstn.xyz**')
              .addField('Error',"```\n"+args[1]+" Incorrect key\n```", true)
              .setTimestamp()
              message.channel.send(Embed)
          }
        })
    } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**xstn.xyz**')
        .addField('Error','```\nPlease Send Key\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
    }
    } else {
        message.channel.send('I dont like cocks ;c')
        log(`[LOG Command] ${message.author.username}, Use Command redeem`, "red")
    }
}

module.exports.help = {
  name: "redeem"
}