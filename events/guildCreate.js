module.exports = (client, guild, pool) => {
// This event triggers when the bot joins a guild.
  console.log(`[INFO] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);

  //add guild to the database with a default prefix
  pool.connect( async (err, clientDB, done) => {
    if (err) throw err;
    clientDB.query(`INSERT INTO guilds (id, prefix) VALUES ('${guild.id}', '${client.settings.defaultSettings.prefix}')`), async (err, result) => {
      done(err);
    };
    client.settings.set(guild.id, client.settings.defaultSettings.prefix, "prefix");
    console.log(`[INFO] INSERT INTO guilds (id, prefix) VALUES ('${guild.id}', '${client.settings.defaultSettings.prefix}')`);
  });

  let logChannel = client.guilds.get(process.env.support_guild_id).channels.get(process.env.support_guild_channel_id);
	logChannel !== undefined? logchannel.send('New guild using WeebMaster: ' + guild.name) : false;
}
