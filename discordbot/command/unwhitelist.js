const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
 if(message.member.roles.cache.some(role => role.name === 'DEV | CEO')){
    if(args[1]) {
        con.query(`SELECT discord_id,userkey FROM whitelistbot WHERE discord_id = '${args[1]}'`, function (err, results, fields) {
            if(results.length) {
                con.query(`DELETE FROM whitelistbot WHERE discord_id = '${args[1]}'`, function (err, results, fields) {

                    const Embed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('**xstn.xyz**')
                    .addField('Whitelist',"\n```Deleted license from discord id: " + args[1] + "```", true)
                    .setTimestamp()
                    message.channel.send(Embed)
                })
            } else {
                const Embed = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription('**xstn.xyz**')
                .addField('Whitelist',"\n```This discord id dont have license!```", true)
                .setTimestamp()
                message.channel.send(Embed)
            }
        })
    } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**xstn.xyz**')
        .addField('Error','```\nPlease send discord ID\n```', true)
        .setTimestamp()
        message.channel.send(Embed)
        log(`[LOG Command] ${message.author.username}, Use Command Add Whitelist Not Id`, "red")
    }
    } else {
        message.channel.send('I don`t like dick`s sorry')
        log(`[LOG Command] ${message.author.username}, Use Command Add Whitelist`, "red")
    }
}

module.exports.help = {
  name: "unwhitelist"
}
