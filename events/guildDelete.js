module.exports = (client, guild, pool) => {
// This event triggers when the bot is removed from a guild.
  console.log(`[INFO] I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);

  // When the bot leaves or is kicked, delete settings to prevent stale entries.
  client.settings.delete(guild.id);

  pool.connect( async (err, clientDB, done) => {
    if(err) throw err;
      clientDB.query(`DELETE FROM guilds where id = '${guild.id}'`), async (err, result) => {
        //disconnent from database on error
        console.log(result);
        done(err);
      };
  });
}
