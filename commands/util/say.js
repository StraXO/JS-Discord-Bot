module.exports.run = async (client, message, args, guildConf) => {
  // Check permission
  if (!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES") || !message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
    console.log("[INFO] Sorry, " + message.member.user.tag + " don't have the permission to execute the command \""+message.content+"\"");
    return message.channel.send("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
  }
  // Message can't be empty
  if (args.join(" ") == "") {
    return message.channel.send("Please provide a message! Check " + guildConf.prefix + "help say").then(msg => {
      msg.delete(2000);
    });
  }

  const sayMessage = args.join(" ");
  // Delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
  message.delete().catch(O_o=>{});
  message.channel.send(sayMessage);
}

module.exports.config = {
  name: "say",
  aliases: ["botsay", "saybot", "tell", "talk"],
  description: "Make the bot speak",
  category: 'util',
  usage: `say <message>`,
  accessableby: "Admins",
  hideFromHelp: false
}
