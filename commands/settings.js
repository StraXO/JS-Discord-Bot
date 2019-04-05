exports.run = (client, message, args, pool) => {
    if(!message.channel.permissionsFor(message.author).has("MANAGE_CHANNELS")) {
      return message.reply("You don't have the permissions to change the prefix!");
    }

    // This is array destructuring
    const [prop, ...value] = args;

    // We can check that the key exists to avoid having multiple useless,
    // unused keys in the config:
    if (prop === "show" || prop === "list" || !prop) {
      //show settings overview
      let configProps = Object.keys(client.settings.prefix).map(prop => {
        return `${prop}  :  ${client.settings[prop]}\n`;
      });
      message.channel.send(`The following are the server's current configuration:
      \`\`\`${configProps}\`\`\``);

    } else if (prop === "prefix") {
      //show settings for prefix
      let arguments = 0;
      try {
        arguments = value[0].length;
      } catch (e) {
      }
      if (arguments >= 1 && arguments <= 5) {
        value.join(" ");

        try {
          pool.connect( async (err, clientDB, done) => {
            if(err) throw err;
            clientDB.query(`UPDATE guilds set prefix = '${value}' WHERE id = '${message.guild.id}'`), async (err, result) => {
              console.log(err);
              console.log("result: " + result);
              done(err);
            };
          });
        } catch (e) {

        }
        client.settings.set(message.guild.id, value, prop);
        message.channel.send(`The prefix has been changed to ${value}`);
      } else {
        message.reply(`Useage: ${client.settings.prefix}settings prefix [Any text, at most 5 characters (e.g. -)]`);
      }
      // other messages
    } else if (!client.settings.has(message.guild.id, prop)) {
      return message.reply(`This is not a valid setting, use ${client.settings.prefix}settings`);
    } else {
      // Now we can finally change the value. Here we only have strings for values
      // so we won't bother trying to make sure it's the right type and such.
      client.settings.set(message.guild.id, value.join(" "), prop);
      // We can confirm everything's done to the client.
      message.channel.send(`Setting ${prop} has been changed to:\n\`${value.join(" ")}\``);
      console.log(`${message.guild} | Setting ${prop} has been changed to:\n\`${value.join(" ")}\``)
    }
}
