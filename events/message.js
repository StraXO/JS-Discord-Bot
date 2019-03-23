module.exports = async (client, message) => {
  const defaultSettings = {
    prefix: "-"
  }

  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

  // Now we can use the values!
  // We stop processing if the message does not start with our prefix for this guild.
  if(message.content.indexOf(guildConf.prefix) !== 0){
   return;
  }


  if (!message.guild || message.author.bot) return; // This stops if it's not a guild, and we ignore all bots.
  if (!message.content.startsWith(guildConf.prefix)) return; //not starting with prefix

  let args = message.content.slice(guildConf.prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  let skipFinally = false;


  try {
    let commandFile = require(`./../commands/${cmd}.js`); //tries to find the required command
    commandFile.run(client, message, args, guildConf); //execute command with parameters

  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.log(`Start error \r\n ${e.stack}`);
    } else {
      console.log(`${message.guild} ${message.author.tag} ran an unknown command: ${guildConf.prefix}${cmd} ${args}`);
      skipFinally = true;
    }

  } finally {
    if (!skipFinally){
      console.log(`${message.guild} ${message.author.tag} ran the command: ${guildConf.prefix}${cmd} ${args}`);
    }
  }
}
