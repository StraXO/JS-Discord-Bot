exports.run = (client, message, args, guildConf) => {
    if(!message.channel.permissionsFor(message.author).has("MANAGE_CHANNELS")) {
      return message.reply("You don't have the permissions to change the prefix!");
    }

    // Let's get our key and value from the arguments.
    // This is array destructuring, by the way.
    const [prop, ...value] = args;
    // Example:
    // prop: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)

    // We can check that the key exists to avoid having multiple useless,
    // unused keys in the config:
    if (prop === "show" || prop === "list" || !prop) {
      //show settings overview
      let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}\n`;
    });
      message.channel.send(`The following are the server's current configuration:
      \`\`\`${configProps}\`\`\``);

    } else if (prop === "prefix") {
      //show settings for prefix
      try {
        let arguments = value[0].length;
      } catch (e) {
        arguments = 0;
      }
      if (arguments > 0 && arguments <= 5) {
        client.settings.set(message.guild.id, value.join(" "), prop);
        message.channel.send(`The prefix has been changed to ${value}`);
      } else {
        message.reply(`Useage: ${guildConf.prefix}settings prefix [Any text, at most 5 characters (e.g. -)]`);
      }
      // other messages
    } else if (!client.settings.has(message.guild.id, prop)) {
      return message.reply(`This is not a valid setting, use ${guildConf.prefix}settings`);
    } else {
      // Now we can finally change the value. Here we only have strings for values
      // so we won't bother trying to make sure it's the right type and such.
      client.settings.set(message.guild.id, value.join(" "), prop);
      // We can confirm everything's done to the client.
      message.channel.send(`Setting ${prop} has been changed to:\n\`${value.join(" ")}\``);
      console.log(`${message.guild} | Setting ${prop} has been changed to:\n\`${value.join(" ")}\``)
    }
}
