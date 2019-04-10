const Discord = require('discord.js');
const client = new Discord.Client();
const Enmap = require('enmap');
const fs = require('fs');

//Database and storage
client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});
const pool = require('./clientpool.js');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const defaultSettings = {
    prefix: 'w!'
};

//commands and events

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[CNF] Command Not Found");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);

        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        });
    });
    console.log("[INFO] Done setting up commands!");
});

client.on('ready', () => require('./events/ready.js')(client, pool));
client.on('message', message => require('./events/message.js')(client, message, pool, defaultSettings));
client.on("guildCreate", guild => require('./events/guildCreate.js')(client, guild, pool, defaultSettings));
client.on("guildDelete", guild => require('./events/guildDelete.js')(client, guild, pool));
client.on("guildMemberAdd", member => require('./events/guildMemberAdd.js')(client, member));

//Login
let token = process.env.client_token;

client.login(token);
