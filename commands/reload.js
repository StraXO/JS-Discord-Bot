// This command reloads other commands, using the command handler
exports.run = (client, message, args) => {
  if (message.author.id !== process.env.client_ops) {
    return message.channels.send('You do not have sufficient permissions to use this command.');
  }

  // Delete from cache
  try { // if command isnt found
    delete require.cache[require.resolve(`./${args[0]}.js`)];
  } catch (e) {
    return message.channel.send(`Unable to reload: ${args[0]}`);
  }

  message.channel.send(`Successfully reloaded: ${args[0]}`);
}
