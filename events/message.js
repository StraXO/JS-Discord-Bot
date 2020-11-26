module.exports = async (client, message, pool) => {
    if (!message.guild) return; // This stops if it's not a guild or itself

    //set the correct prefix
    let guildConf = client.settings.ensure(message.guild.id, client.settings.defaultSettings);

    if (!message.content.startsWith(guildConf.prefix) || message.author.bot) return; // Does not use prefix

    let args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g); // Get all arguments, removing the prefix
    let cmd = args.shift().toLowerCase(); // Get the first argument which is the command

    //run the command
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (commandFile) {
      commandFile.run(client, message, args, guildConf, pool);
      console.log(`[INFO] ${message.guild} ${message.author.tag} ran the command: ${guildConf.prefix}${cmd} ${args.join(" ")}`);
    } else {
      console.log(`[CNF] ${message.guild} ${message.author.tag} ran an unknown command: ${guildConf.prefix}${cmd} ${args.join(" ")}`);
    }
}
