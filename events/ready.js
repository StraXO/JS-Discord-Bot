const Discord = require('discord.js')
const Enmap = require('enmap')
const fs = require('fs')

module.exports = async (client, pool) => {
  //Setup bot
  console.log(`[STARTUP] Logged in as: ${client.user.tag}`);
  //Set the bot's activity
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);

  // Storing data
  
  client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
  });

  client.settings.defaultSettings = {
    prefix: "w!"
  }

  //Database connection
  pool.connect( async (err, clientDB, done) => {
    if(err) throw err;
    console.log('[STARTUP] Connected to PostgresSQL');

    // If table does not exist then create it
    clientDB.query('create table if not exists guilds(id text primary key, prefix text)', (err, result) => {
      //disconnent from database on error
      done(err);
    });
    //Get all database information
    let result = await clientDB.query('SELECT * from guilds');

    //Calculate user amount and saves amount of users total
    let totalUsers = 0;
    let listServers = [];

    client.guilds.forEach((guild) => {
      totalUsers += guild.memberCount;
      listServers.push(`${guild.memberCount}`);
    });
    //Log servers and users total
    console.log(`[STARTUP] Servers: ${client.guilds.size} Users: ${totalUsers}`);

    //Log all servers with corresponding data for debug
    let i = 0;
    result.rows.forEach((guild) => {
      client.settings.set(guild.id, guild.prefix, "prefix");
      console.log(`[STARTUP] ${client.guilds.get(guild.id)} (${listServers[i]}) (${guild.id}) ${guild.prefix}`);
      i++;
    });
  });
}
