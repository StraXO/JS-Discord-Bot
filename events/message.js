module.exports = async (client, message, pool) => {
    // Set the correct prefix
    const guildConf = client.settings.ensure(message.guild.id, client.settings.defaultSettings);

    if (!message.guild) return; // Message is not in a guild (direct message)
    if (!message.content.startsWith(guildConf.prefix) || message.author.bot) return; // Does not use prefix
    if (process.env.NODE_ENV === "dev" && message.author.id !== process.env.client_ops) return; // In dev mode dont allow other people to query this instance

    const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g); // Get all arguments, removing the prefix
    const cmd = args.shift().toLowerCase(); // Get the first argument which is the command

    // Run the command
    const commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (commandFile) {
      commandFile.run(client, message, args, guildConf, pool);
      console.log(`[INFO] ${message.guild} ${message.author.tag} ran the command: ${guildConf.prefix}${cmd} ${args.join(" ")}`);
    } else {
      console.log(`[CNF] ${message.guild} ${message.author.tag} ran an unknown command: ${guildConf.prefix}${cmd} ${args.join(" ")}`);
    }
}
