module.exports = async (client, pool) => {
  console.log(`[STARTUP] Logged in as: ${client.user.tag}`);

  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);

  let totalUsers = 0;
  let serverList = "";
  client.guilds.forEach((guild) => {
    serverList += `[STARTUP] - ${guild.name} (${guild.memberCount}) \n`;
    totalUsers += guild.memberCount;
  });
  console.log(`[STARTUP] Servers: ${client.guilds.size} Users: ${totalUsers} \n${serverList}`);

  //Database connection
  pool.connect( async (err, clientDB, done) => {
    if(err) throw err;
    console.log('[STARTUP] Connected to PostgresSQL');

    // If table does not exist then create it
    clientDB.query('create table if not exists guilds(id text primary key, prefix text)', (err, result) => {
      //disconnent from database on error
      done(err);
    });

    let result = await clientDB.query('SELECT * from guilds');

    result.rows.forEach((guild) => {
      client.settings.set(guild.id, guild.prefix, "prefix");
      console.log("[STARTUP] " + guild.id, " " + guild.prefix);
    });
  });
}
