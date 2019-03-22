module.exports = (client, message) => {
  if (message.author.bot) return; //this will ignore all bots
  if (!message.content.startsWith(process.env.config_prefix)) return; //not starting with prefix

  let args = message.content.slice(process.env.config_prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  let skipFinally = false;
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
      console.log(`${message.author.tag} ran an unknown command: ${process.env.config_prefix}${cmd} ${args} | ${message.createdAt}`);
      skipFinally = true;
    }

  } finally {
    if (!skipFinally){
      console.log(`${message.author.tag} ran the command: ${process.env.config_prefix}${cmd} ${args} | ${message.createdAt}`);
    }
  }
}
