exports.run = (client, message, args, guildConf, pool) => {

  // This is array destructuring
  const [prop, ...value] = args;

  if (prop === "prefix") {
    //show settings for prefix
    let arguments = 0;
    try {
      arguments = value[0].length;
    } catch (e) {
    }
    if (arguments >= 1 && arguments <= 5) {
      value.join(" ");

      try {
        // try to add the value to the database
        pool.connect( async (err, clientDB, done) => {
          if(err) throw err;
          clientDB.query(`UPDATE guilds set prefix = '${value}', updated_date CURRENT_TIMESTAMP WHERE id = '${message.guild.id}'`), async (err, result) => {
            done(err);
          };
          console.log(`[DB] UPDATE guilds set prefix = '${value}' WHERE id = '${message.guild.id}'`);
        });

        client.settings.set(message.guild.id, value[0], prop);
        message.channel.send(`The prefix has been changed to: ${value}`);
        console.log(`[INFO] The prefix has been changed to: ${value}`);

      } catch (e) {
        console.log("[ERR] Error happened on setting prefix: ID:" + message.guild.id + " val:" + value[0] + " prop:" + prop)
      }

    } else {
      message.reply(`Usage: ${guildConf.prefix}settings prefix (Max 5 characters)`);
    }
    // other messages
    //(!guildConf.has(message.guild.id, prop))
  } else {
    return message.reply(`This is not a valid setting, try ${guildConf.prefix}help settings`);
  }
}

module.exports.config = {
  name: "prefix"
}
