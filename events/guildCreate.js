module.exports = (client, guild, pool) => {
// This event triggers when the bot joins a guild.
  console.log(`[INFO] New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);

  //add guild to the database with a default prefix
  const defaultSettings = {
      prefix: 'w!'
  };

  pool.connect( async (err, clientDB, done) => {
    if (err) throw err;
    clientDB.query(`INSERT INTO guilds (id, prefix) VALUES ('${guild.id}', '${defaultSettings.prefix}')`), async (err, result) => {
      console.log(err);
      console.log("result: " + result);
      done(err);
    };
  });
}
