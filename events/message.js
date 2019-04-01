module.exports = async (client, message, pool) => {
  const defaultSettings = {
    prefix: "-"
  }

  pool.connect( async (err, clientDB, done) => {
    if(err) throw err;
      clientDB.query(`select prefix from guilds where id = '${message.guild.id}' limit 1`), async (err, result) => {
        //disconnent from database on error
        if (result === undefined) {
          console.log(`result is undefined`);
        } else {
          client.settings.prefix = result;
          console.log(result);
        }
        done(err);
      };
  });


  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

  const aprilFools = true;
  if (aprilFools === true) {
    let commandFile = require(`./../commands/aprilFools.js`);
    commandFile.run(client, message, guildConf);
  }

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
    commandFile.run(client, message, args, guildConf, pool); //execute command with parameters
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
