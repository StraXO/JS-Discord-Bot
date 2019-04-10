module.exports = async(client, message, pool) => {
    if (!message.guild || message.author.bot) return; // This stops if it's not a guild, and we ignore all bots.

    //setup things before sending a message
    const defaultSettings = {
        prefix: 'w!'
    };

    const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

    pool.connect(async(err, clientDB, done) => {
        if (err) throw err;
        clientDB.query(`select prefix from guilds where id = '${message.guild.id}' limit 1`), async(err, result) => {
            //disconnent from database on error
            if (result === undefined) {
              console.log(`The guild ${message.guild.name} does not exist in the database (${message.guild.id}). Creating a new key!`);
              clientDB.query(`INSERT INTO guilds (id, prefix) VALUES ('${guild.id}', '${defaultSettings.prefix}')`), async (err, result) => {
                done(err);
              };
              console.log(`INSERT INTO guilds (id, prefix) VALUES ('${guild.id}', '${defaultSettings.prefix}')`);
              guildConf.prefix = defaultSettings.prefix;
            } else {
                guildConf.prefix = result;
                console.log(result);
            }
            console.log("Result: " + result);
            done(err);
        };
    });

    //actions on messages

    //if in the guild
    if (message.guild.name === "WeebDungeon") {
        //if is send in channels
        if (message.channel.name === "🔞nsfw-general" || message.channel.name === "🔞nsfw-bots" || message.channel.name === "⭐strax-private") {
            //check if "🔞nsfw-gallery" exists
            const galleryChannel = message.guild.channels.find(channel => channel.name === "🔞nsfw-gallery");

            if (!galleryChannel) {
                console.log('The gallery channel does not exist');
            } else {
                //if is attachment
                if (message.attachments.size > 0) {
                    message.attachments.forEach(attachment => {
                        galleryChannel.send("", { file: attachment.url });
                    });
                } else if (message.embeds.length > 0) {
                    message.embeds.forEach(embed => {
                        galleryChannel.send("", { file: embed.url });
                    });
                }
            }
        }
    }

    if (!message.content.startsWith(guildConf.prefix)) return;

    let args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    //run the command
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    if (commandFile) {
      commandFile.run(client, message, args, guildConf, pool);
      console.log(`[INFO] ${message.guild} ${message.author.tag} ran the command: ${guildConf.prefix}${cmd} ${args}`);
    } else {
      console.log(guildConf.prefix);
      console.log(cmd);
      console.log(args);
      console.log(`[CNF] ${message.guild} ${message.author.tag} ran an unknown command: ${guildConf.prefix}${cmd} ${args}`);
    }
}
