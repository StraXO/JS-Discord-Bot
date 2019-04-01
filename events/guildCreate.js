module.exports = (client, guild, pool) => {
// This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);

  pool.connect( async (err, clientDB, done) => {
    if(err) throw err;
    clientDB.query(`INSERT INTO guilds (id, prefix) VALUES ('${guild.id}', '-')`), async (err, result) => {
      console.log(err);
      console.log("result: " + result);
      done(err);
    };
  });
}
