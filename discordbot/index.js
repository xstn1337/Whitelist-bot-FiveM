const discord = require("discord.js"),
    fs = require('fs'), 
    mysql = require("mysql"),
    colors = require("colors"),
    superagent = require('superagent'),
    request = require('request'),
    config = require('./config.json'),
    cooldowns = new discord.Collection()

const bot = new discord.Client({disableEveryone: true})
bot.command = new discord.Collection()
require('discord-buttons')(bot)
const { MessageButton, MessageActionRow } = require("discord-buttons")

const prefix = config.prefix

function log(text, color) {
    let d = new Date(),
        h = d.getHours(),
        m = d.getMinutes(),
        ap = "AM"
    if (h > 12) { h -= 12; ap = "PM" }
    if (m < 10) { m = "0" + m }
    time = h + ":" + m + " " + ap
 
    if (typeof(color) == "undefined") { console.log(colors.grey(time) + " : " + text) }
    if (typeof(color) != "undefined") { console.log(colors.grey(time) + " : " + colors[color](text)) }
}

fs.readdir('./command/', (err, files) => {
  if(err) log(err, "red")

  let jsfile = files.filter(f => f.split('.').pop() === 'js')
  if(jsfile.length <= 0) {
    return
  }

  log('Loaded '+ jsfile.length +' file', "green")

  jsfile.forEach((f, i) => {
    let props = require('./command/'+ f)
    bot.command.set(props.help.name, props)
  })
})

bot.on('clickButton', async (button) => {
  if (button.id === 'discordid') {
    button.channel.send(`${button.clicker.user} your Discord ID: ${button.clicker.user.id}`).then(msg => msg.delete({timeout: 10000}))
    button.defer()
  }
})

function handleConnection() {
    con = mysql.createConnection(config.sql);
 
    con.connect(function(err) {
        if (err) {
            log("[ERROR] An error has occurred while connection: " + err, "red");
            log("[INFO] Attempting to establish connection with SQL database.", "yellow");
            setTimeout(handleConnection, 2000);
        } else {
            log("[SUCCESS] SQL database connection established successfully.", "green");
        }
    });
 
    con.on("error", function(err) {
        console.log("Error: " + err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleConnection();
        } else {
            throw err;
        }
    });
}

con = mysql.createConnection(config.sql);

con.connect(function(err) {
    if (err) {
        log("[ERROR] An error has occurred while connection: " + err, "red");
        log("[INFO] Attempting to establish connection with SQL database.", "yellow");
        setTimeout(handleConnection, 2000);
    } else {
        log("[SUCCESS] SQL database connection established successfully.", "green");
    }
});

con.on("error", function(err) {
    console.log("Error: " + err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleConnection();
    } else {
        throw err;
    }
});

bot.on('message', (message) => {
  if (message.channel.type == 'dm') {
    return message.author.send('Commands not working in dm sorry 🥶')
  }
    let PREFIX = '$'
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  
    const args = message.content
      .toLowerCase()
      .slice(PREFIX.length)
      .trim()
      .split(/\s+/);
    const [command, input] = args;
  
    if (command === 'clear' || command === 'c') {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel
          .send(
            "i dont like dicks sorry 🤡",
          );
      }
  
      if (isNaN(input)) {
        return message.channel
          .send('its not a value')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      if (Number(input) < 0) {
        return message.channel
          .send('ERROR: 107A')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      // add an extra to delete the current message too
      const amount = Number(input) > 100
        ? 101
        : Number(input) + 1;
  
      message.channel.bulkDelete(amount, true)
      .then((_message) => {
        message.channel
          // do you want to include the current message here?
          // if not it should be ${_message.size - 1}
          .send(`cleared \`${_message.size}\``)
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      });
    }
});

function makeid(length) {
   var result           = 'xstnxyz_';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}



bot.on("ready", () => {
  let index = 0
  setInterval(() => {
    
    const guild = bot.guilds.cache.get("814065913036668948");
    let roleID = '816629735252951060';
    let memberCount = guild.roles.cache.get(roleID).members.size;
    var memberCountt = guild.memberCount;
    const array = [
      `xstn.xyz`,
      `Customers: ${memberCount}`,
      `Members: ${memberCountt}`,
    ]
    if (index === array.length) index = 0;
    const status = array[index];
    bot.user.setActivity(status);
    index++;

  }, 5000)
})


bot.on('guildMemberAdd', member => {
    const guild = bot.guilds.cache.get("814065913036668948");
    member.guild.channels.cache.get('861255388158099456').send(`Hey ${member.user}, welcome to the xstn.xyz`);
    const idrola1 = `816629697102086164`
    const rolahalf = guild.roles.cache.get(`${idrola1}`)
    member.roles.add(rolahalf)
});

bot.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.id !== `861257959760723980`) return
    if (reaction._emoji.name !== `✅`) return

    const guild = reaction.message.channel.guild
    const idrola1 = `816629697102086164`
    const rolahalf = guild.roles.cache.get(`${idrola1}`)
    const uzytkownik = guild.members.cache.get(`${user.id}`)


uzytkownik.roles.add(rolahalf)
});

bot.on("message", async message => {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(config.prefix)) return;
    const messageArray = message.content.split(/\s+/g)
    const coa = messageArray[0]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const role = message.guild.roles.cache.find(role => role.name === 'CUSTOMER');

    const cmd = bot.command.get(coa.slice(config.prefix.length))
    if(cmd) cmd.run(bot, message, con, log, role, makeid, args)
})


bot.login(config.token)