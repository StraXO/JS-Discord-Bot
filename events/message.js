module.exports = (client, message) => {
  let prefix = process.env.config_prefix;
  if (message.author.bot) return; //this will ignore all bots
  if (!message.content.startsWith(prefix)) return; //not starting with prefix

  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  try {
    // Auto-Reload (You should move this into it's own command)
    delete require.cache[require.resolve(`./../commands/${cmd}.js`)];

    let ops = {
      ownerID: process.env.client_ops
    }

    let commandFile = require(`./../commands/${cmd}.js`); //tries to find the required command
    commandFile.run(client, message, args, ops); //execute command with parameters

  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.log(`Start error | ${message.createdAt} \r\n ${e.stack}`);
    } else {
      console.log(`${message.author.tag} ran an unknown command: ${prefix}${cmd} ${args} | ${message.createdAt}`);
      break;
    }

  } finally {
    console.log(`${message.author.tag} ran the command: ${prefix}${cmd} ${args} | ${message.createdAt}`);
  }
}
