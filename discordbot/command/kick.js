const discord = module.require('discord.js')

module.exports.run = async (bot, message, con, log, role, makeid, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
       return message.channel.send(`Lmao 🤡`);
    }
    let mentionMember = message.mentions.members.first()
    if (!mentionMember) {
       return message.channel.send('Invalid user 🤡');
    }
    let Embed = new discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor('xstn.xyz')
    .setDescription('**Kicked**\n Successfully kicked <@' + mentionMember + '> 🥶')
    message.channel.send(Embed)
    mentionMember.kick()
    return;
}

module.exports.help = {
  name: "kick"
}
