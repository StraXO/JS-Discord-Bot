const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
try {
const config = require("./config.json");
} catch (e) {
  try {
    const config = (
      config.prefix => process.env.prefix,
      config.ops = process.env.ops,
      config.token = process.env.token
    );

  } catch (e) {
    console.log(e.stack);
  }
  console.log(e.stack);
}
//Commands
client.commands = new Discord.Collection();

client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('reload', require('./commands/reload.js'));
client.commands.set('rip', require('./commands/rip.js'));

client.on('ready', () => require('./events/ready.js')(client));
client.on('message', message => require('./events/message.js')(client, message));


client.login(config.token);
