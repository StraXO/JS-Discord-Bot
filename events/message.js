module.exports = async(client, message, pool, defaultSettings) => {
    if (!message.guild || message.author.bot) return; // This stops if it's not a guild or itself

    //if in the guild
    if (message.guild.name === "WeebDungeon") {
        //and is send in these channels
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

    //set the correct prefix
    let guildConf = client.settings.ensure(message.guild.id, defaultSettings);

    pool.connect( async (err, clientDB, done) => {
      if(err) throw err;

      //get the prefix from the database
      // results = await clientDB.query(`SELECT prefix from guilds WHERE id = '${message.guild.id}' LIMIT 1`);
      // let result = results.rows[0];
      //
      // if (result.prefix !== guildConf.prefix) {
      //   guildConf.prefix = result.prefix;
      // }

      if (!message.content.startsWith(guildConf.prefix)) return; // Does not use prefix


      let args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g); // Get all arguments, removing the prefix
      let cmd = args.shift().toLowerCase(); // Get the first argument which is the command

      //run the command
      let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

      if (commandFile) {
        commandFile.run(client, message, args, guildConf, pool);
        console.log(`[INFO] ${message.guild} ${message.author.tag} ran the command: ${guildConf.prefix}${cmd} ${args}`);
      } else {
        console.log("[CNF] prefix: " + guildConf.prefix + " length: " + guildConf.prefix.length + "  cmd: " + cmd + " args: " + args);
        console.log(`[CNF] ${message.guild} ${message.author.tag} ran an unknown command: ${guildConf.prefix}${cmd} ${args}`);
      }
    });
}
