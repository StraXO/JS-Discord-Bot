const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

//Commands
client.commands = new Discord.Collection();

client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('reload', require('./commands/reload.js'));
client.commands.set('rip', require('./commands/rip.js'));
client.commands.set('avatar', require('./commands/avatar.js'));

client.on('ready', () => require('./events/ready.js')(client));
client.on('message', message => require('./events/message.js')(client, message));
client.on("guildCreate", guild => require('.events/guildCreate.js')(client, guild));
client.on("guildDelete", guild => require('.events/guildDelete.js')(client, guild));


client.login(process.env.client_token);
