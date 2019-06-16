const Discord = require('discord.js')
const client = new Discord.Client();
const pool = require('./clientpool.js')
const fs = require('fs')

// Setup events
client.on('ready', () => require('./events/ready.js')(client, pool));
client.on('message', message => require('./events/message.js')(client, message, pool));
client.on("guildCreate", guild => require('./events/guildCreate.js')(client, guild, pool));
client.on("guildDelete", guild => require('./events/guildDelete.js')(client, guild, pool));
client.on("guildMemberAdd", member => require('./events/guildMemberAdd.js')(client, member));


// Setup commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.setting = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  //check if the folder commands exists
  if (err) console.log(err)

  files.forEach((file) => {
      //this is for directories within the commands directory
      fs.readdir(`./commands/${file}/`, (err, commands) => {
        if (err) console.log(err)

        let jsfile = commands.filter(f => f.split(".").pop() === "js")

        jsfile.forEach((f, i) => {
          //command in the directory
          console.log(`[Command] ./commands/${file}/${f}`);
          let pull = require(`./commands/${file}/${f}`);

          client.commands.set(pull.config.name, pull);
          pull.config.aliases.forEach(alias => {
          client.aliases.set(alias, pull.config.name)
        });
      });
    });
  });
});

fs.readdir('./settings/', (err, files) => {
  //check if the folder commands exists
  if (err) console.log(err)

  files.forEach((file) => {
    //settings
    console.log(`[Setting] ./settings/${file}`);
    let pull = require(`./settings/${file}`);

    client.setting.set(pull.config.name, pull);
  });
});

//Login
client.login(process.env.client_token);
