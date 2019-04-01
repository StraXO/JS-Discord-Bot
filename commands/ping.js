exports.run = async(client, message, args) => {
  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
  // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
  const m = await message.channel.send("Ping?");
  message.channel.send("Pinging ...") // Placeholder for pinging ...
  			.then((msg) => { // Resolve promise
  				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp) + "ms") // Edits message with current timestamp minus timestamp of message
  			});}
