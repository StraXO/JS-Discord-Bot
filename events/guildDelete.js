module.exports = (client, guild, pool) => {
  // This event triggers when the bot is removed from a guild.
  // When the bot leaves or is kicked, delete settings to prevent stale entries.
  pool.connect( async (err, clientDB, done) => {
    if(err) throw err;
      clientDB.query(`DELETE FROM guilds where id = '${guild.id}'`), async (err, result) => {
        //disconnent from database on error
        done(err);
      };
  });

  let logChannel = client.guilds.get(process.env.support_guild_id).channels.get(process.env.support_guild_channel_id);
	logChannel !== undefined? logChannel.send('Farewell: ' + guild.name) : false;

  if (client.settings !== undefined) {
    client.settings.delete(guild.id);
  }

  if (guild.name !== undefined) {
    console.log(`[INFO] I have been removed from: ${guild.name} (id: ${guild.id})`);
  }
  
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);
}
