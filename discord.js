const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true,
  disabledEvents: [
    'START_TYPING',
    'STOP_TYPING'
  ]
});
const Enmap = require('enmap');
const pool = require('./clientpool.js');
const fs = require('fs');

// Storing data
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

defaultSettings = {
  prefix: "w!"
}

// Commands and events
fs.readdir('./commands/', (err, files) => {
    //check if the folder commands exists
    if (err) console.log(err)

    files.forEach((file) => {
      //this is for directories within commands
      fs.readdir(`./commands/${file}/`, (err, commands) => {
        let jsfile = commands.filter(f => f.split(".").pop() === "js")

        jsfile.forEach((f, i) => {
          //command in the directory
          console.log(`./commands/${file}/${f}`);
            let pull = require(`./commands/${file}/${f}`);

            client.commands.set(pull.config.name, pull);
            pull.config.aliases.forEach(alias => {
                client.aliases.set(alias, pull.config.name)
            });
        });
      });
    });
});

// fs.readdirSync('./commands').forEach(c => {
//   const files = fs.readdirSync(`./commands/${c}`).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3));
//
//   files.forEach(file => {
//     let pull = require(`./commands/${c}`);
//
//     client.commands.set(pull.config.name, pull);
//     pull.config.aliases.forEach(alias => {
//         client.aliases.set(alias, pull.config.name)
//     });
//   });
// });

client.on('ready', () => require('./events/ready.js')(client, pool));
client.on('message', message => require('./events/message.js')(client, message, pool, defaultSettings));
client.on("guildCreate", guild => require('./events/guildCreate.js')(client, guild, pool, defaultSettings));
client.on("guildDelete", guild => require('./events/guildDelete.js')(client, guild, pool));
client.on("guildMemberAdd", member => require('./events/guildMemberAdd.js')(client, member));

//Login
let token = process.env.client_token;

client.login(token);
