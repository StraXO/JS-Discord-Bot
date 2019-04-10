module.exports = async(client, message, pool, defaultSettings) => {
    if (!message.guild) return; // This stops if it's not a guild

    const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

    //If the bot loses his prefix for an reason or another...
    if (!guildConf.prefix || guildConf.prefix === undefined) {
      pool.connect( async (err, clientDB, done) => {
        if (err) throw err;
        clientDB.query(`SELECT prefix from guilds where id = '${guild.id}'`), async (err, result) => {
          guildConf.prefix = result;
          done(err);
        };
        console.log(`[INFO] SELECT prefix from guilds where id = '${guild.id}'`);
      });
    }

    //actions on messages in a guild

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

    if(message.author.bot) return; // Ignore all bots

    if (!message.content.startsWith(guildConf.prefix)) return; // Does not use prefix

    let args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g); // Get all arguments, removing the prefix
    let cmd = args.shift().toLowerCase(); // Get the first argument which is the command

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
