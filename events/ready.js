module.exports = client => {
  console.log(`Logged in as: ${client.user.tag}`);

  client.user.setActivity(`Currently serving ${client.guilds.size} servers`, {type: "WATCHING"});

  console.log(`Servers: ${client.guilds.size} Users: ${client.users.size}`);
  client.guilds.forEach((guild) => {
    console.log(` - ${guild.name} (${guild.memberCount})`);
  })
}
