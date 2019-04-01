exports.run = async(client, message, args) => {
  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
  // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
  message.channel.send("Testing ping...") // Placeholder for pinging ...
  .then((msg) => { // Resolve promise
  	msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + "ms") // Edits message with current timestamp minus timestamp of message
  });
}
