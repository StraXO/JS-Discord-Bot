module.exports = async(client, message, pool, defaultSettings) => {
    if (!message.guild || message.author.bot) return; // This stops if it's not a guild or itself

    const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
    console.log(guildConf);

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

    if (!message.content.startsWith(guildConf.prefix)) return; // Does not use prefix

    let args = message.content.slice(guildConf.prefix[0].length).trim().split(/ +/g); // Get all arguments, removing the prefix
    let cmd = args.shift().toLowerCase(); // Get the first argument which is the command

    console.log(args);
    console.log(cmd);

    //run the command
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    if (commandFile) {
      commandFile.run(client, message, args, guildConf, pool);
      console.log(`[INFO] ${message.guild} ${message.author.tag} ran the command: ${guildConf.prefix}${cmd} ${args}`);
    } else {
      console.log("prefix " + guildConf.prefix);
      console.log("cmd " + cmd);
      console.log("args " + args);
      console.log(`[CNF] ${message.guild} ${message.author.tag} ran an unknown command: ${guildConf.prefix}${cmd} ${args}`);
    }
}
