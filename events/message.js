module.exports = async (client, message, pool) => {

  pool.connect( async (err, clientDB, done) => {
    if(err) throw err;
      clientDB.query(`select prefix from guilds where id = '${message.guild.id}' limit 1`), async (err, result) => {
        //disconnent from database on error
        if (result === undefined) {
          console.log(`The guild ${message.guild.name} does not exist in the database (${message.guild.id}). Creating a new key!`);
          pool.connect( async (err, clientDB, done) => {
            if(err) throw err;
            const defaultGuildPrefix = 'w!';
            clientDB.query(`INSERT INTO guilds (id, prefix) VALUES ('${guild.id}', '${defaultGuildPrefix}')`), async (err, result) => {
              console.log(err);
              console.log("result: " + result);
              done(err);
            };
          });
        } else {
          client.settings.prefix = result;
          console.log(result);
        }
        done(err);
      };
  });

  if (!message.guild || message.author.bot) return; // This stops if it's not a guild, and we ignore all bots.

  //if is attachment
  if (message.attachments.size > 0) {
    //if in the guild
    if (message.guild.name === "WeebDungeon") {
      //if is send in channels
      if (message.channel.name === "🔞nsfw-general" || message.channel.name === "🔞nsfw-bots" || message.channel.name === "⭐strax-private") {
        //check if "🔞nsfw-gallery" exists
        const galleryChannel = message.guild.channels.find(channel => channel.name === "🔞nsfw-gallery");

        if (!galleryChannel) {
          console.log('The gallery channel does not exist');
        } else {
          //The channel exists and i'm able to message it
          message.attachments.forEach(attachment => {
            galleryChannel.send("", { file: attachment.url });
          });
        }
      }
    }
  }

  // Now we can use the values!
  // We stop processing if the message does not start with our prefix for this guild.
  if(message.content.indexOf(client.settings.prefix) !== 0) return;
  if (!message.content.startsWith(client.settings.prefix)) return; //not starting with prefix

  let args = message.content.slice(client.settings.prefix).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  let skipFinally = false;
  try {
    let commandFile = require(`./../commands/${cmd}.js`); //tries to find the required command
    commandFile.run(client, message, args, pool); //execute command with parameters
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.log(`Start error \r\n ${e.stack}`);
    } else {
      console.log(`${message.guild} ${message.author.tag} ran an unknown command: ${client.settings.prefix}${cmd} ${args}`);
      skipFinally = true;
    }
  } finally {
    if (!skipFinally){
      console.log(`${message.guild} ${message.author.tag} ran the command: ${client.settings.prefix}${cmd} ${args}`);
    }
  }
}
