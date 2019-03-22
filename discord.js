const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

//Commands
client.commands = new Discord.Collection();

client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('reload', require('./commands/reload.js'));
client.commands.set('rip', require('./commands/rip.js'));

client.on('ready', () => require('./events/ready.js')(client));
client.on('message', message => require('./events/message.js')(client, message));
console.log(process.env.client_token);
client.login(process.env.config_token);
