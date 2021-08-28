const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
 if(message.member.roles.cache.some(role => role.name === 'DEV | CEO')){
    if(args[1] && args[2] && args[3]) {
        con.query(`SELECT discord_id FROM whitelistbot WHERE discord_id = '${args[1]}'`, function (err, results, fields) {
            if(results.length) {
                const Embed = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription('**xstn.xyz**')
                .addField('Error',"```\n"+args[1]+" Had Whitelist, Can't Give Another\n```", true)
                .setTimestamp()
                message.channel.send(Embed)
            } else {
                if(args[3] == 'month') {
                    var date = new Date();
                    date.setDate(date.getDate() + 30);
                    var dateString = date.toISOString().split('T')[0];
                    console.log(dateString)
                } else if(args[3] == 'lifetime') {
                    var dateString = '3021-01-01'
                }

                var datekurwa = new Date();
                datekurwa.setDate(datekurwa.getDate());
                var dateString1 = datekurwa.toISOString().split('T')[0];
                con.query(`INSERT INTO whitelistbot (discord_id, userkey, hwid, ip, Blacklisted, Reason, redeemed, created_at, expire_at) VALUES ('${args[1]}', '${makeid(26)}', 'Unknown', '${args[2]}', 'False', 'Unknown', 'False', '${dateString1}', '${dateString}')`, function (err, results, fields) {
                    const Embed = new discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription('**xstn.xyz**')
                    .addField('Whitelist',"\n```Discord ID: " + args[1] + " and IP: " + args[2] + " whitelisted```", true)
                    .setTimestamp()
                    message.channel.send(Embed)
                })
            }
        })
    } else {
        const Embed = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setDescription('**xstn.xyz**')
        .addField('Error','```\nPlease Send Id Disord and IP server\n```', true)
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
  name: "whitelist"
}
