const Discord = require('discord.js')

module.exports.run = async (client, message, args, guildConf) => {
  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
  // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
  message.channel.send("Testing ping...") // Placeholder for pinging ...
  .then((msg) => { // Resolve promise
  	msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + "ms") // Edits message with current timestamp minus timestamp of message
  });
}

module.exports.config = {
  name: "ping",
  aliases: ["latency"],
  description: "Send an user or multiple users' their avatar",
  useage: `avatar @user (@more users)`,
  accessableby: "Members"
}
