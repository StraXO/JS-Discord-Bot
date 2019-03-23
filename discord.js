const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
// Initialize **or load** the server configurations
const Enmap = require('enmap');
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

//Commands
client.commands = new Discord.Collection();

client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('reload', require('./commands/reload.js'));
client.commands.set('rip', require('./commands/rip.js'));
client.commands.set('avatar', require('./commands/avatar.js'));
client.commands.set('purge', require('./commands/purge.js'));
client.commands.set('settings', require('./commands/settings.js'));

client.on('ready', () => require('./events/ready.js')(client));
client.on('message', message => require('./events/message.js')(client, message));
client.on("guildCreate", guild => require('./events/guildCreate.js')(client, guild));
client.on("guildDelete", guild => require('./events/guildDelete.js')(client, guild));
client.on("guildMemberAdd", member => require('./events/guildMemberAdd.js')(client, member));

let token = process.env.client_token;
if (!token) {
  config = require('./config.json');
  token = config.token;
}

client.login(token);
