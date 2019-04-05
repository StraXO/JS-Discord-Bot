module.exports = (client, guild, pool) => {
// This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);
}
