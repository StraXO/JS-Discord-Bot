module.exports = (client, guild) => {
// This event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Currently serving ${client.guilds.size} servers`);

  // When the bot leaves or is kicked, delete settings to prevent stale entries.
  client.settings.delete(guild.id);
}
