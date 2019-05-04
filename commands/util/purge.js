const Discord = require('discord.js')

module.exports.run = async(client, message, args, guildConf) => {
  if (!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") || !message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
    console.log("[INFO] Sorry, you don't have the permission to execute the command \""+message.content+"\"");
    return message.channel.send("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
  }

  // Only delete messages if the channel type is TextChannel
  // DO NOT delete messages in DM Channel or Group DM Channel
  let deleteAmount = parseInt(args[0], 10);
  let deleteMin = 1;
  let deleteMax = 20;

  if (deleteAmount !== typeof(NaN)) {
    if (message.channel.type == 'text' && deleteAmount > 0 && deleteAmount < deleteMax+1) {
      message.channel.fetchMessages({limit: deleteAmount + 1})
        .then(messages => {
          try {
          message.channel.bulkDelete(messages);
          messagesDeleted = messages.array().length; // number of messages deleted
          } catch (e) {
            console.log("[ERR] Cannot execute purge");
          }

          // Logging the number of messages deleted on both the channel and console.
          console.log(`[INFO] Deletion of messages successful. Total messages deleted: ${messagesDeleted -2}`);
        })
        .catch(err => {
          console.log('[LOG] Error while doing Bulk Delete');
          console.log(err);
        });
    } else {
      message.channel.send(`Please enter a valid number, usage: ${guildConf.prefix}purge (${deleteMin} - ${deleteMax})`);
    }
  } else {
    message.channel.send(`Please enter a valid number, usage: ${guildConf.prefix}purge (${deleteMin} - ${deleteMax})`);
  }
}

module.exports.config = {
  name: "purge",
  aliases: ["clear"],
  description: "Clears a specified amount of messages",
  category: 'util',
  usage: `purge <Amount of messages>`,
  accessableby: "Admins"
}
