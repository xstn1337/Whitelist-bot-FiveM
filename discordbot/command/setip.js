const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
 if(message.member.roles.cache.some(role => role.name === 'SUPPORT')){
    if(args[1]) {
      if(args[2]) {
        let ipnowe = args.slice(2).join(" ")
        con.query(`SELECT userkey,ip,change_ip FROM whitelistbot WHERE userkey = '${args[1]}'`, function (err, results, fields) {
          let ips = results[0].ip
          let change_ip = results[0].change_ip
        if(results.length) {
          var datekurwa = new Date();
          datekurwa.setDate(datekurwa.getDate() + 30);
          var dateString1 = datekurwa.toISOString().split('T')[0];

          var datechuj = new Date();
          datechuj.setDate(datechuj.getDate());
          var dateStringchuj = datechuj.toISOString().split('T')[0];
          const changee = Date.parse(change_ip)
          const kiedy = Date.parse(dateStringchuj)
          console.log(changee, kiedy)
          if (changee >= kiedy) {
            return message.channel.send('```Sorry, but you this key have a cooldown - that can be changed in: ' + change_ip + '```')
      
          }
                con.query(`Update whitelistbot Set ip = '${args[2]}', change_ip = '${dateString1}' Where userkey = '${args[1]}'`, function (err, results, fields) {
                  const Embed = new discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setDescription('**xstn.xyz**')
                  .addField('Change IP',"```Successfully changed IP old: " + ips +  " new: " +ipnowe+"\n``` **Key** \n`" + args[1] + '`', true)
                  .setTimestamp()
                  message.channel.send(Embed)
                  log(`[LOG Command] ${message.author.username}, Use Command Setip`, "green")
                })
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
        .addField('Error','```\nPlease Send IP\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
      }
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
        log(`[LOG Command] ${message.author.username}, Use Command Add Whitelist`, "red")
    }
}

module.exports.help = {
  name: "setip"
}