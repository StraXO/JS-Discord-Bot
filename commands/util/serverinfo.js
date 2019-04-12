const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let siEmbed = new Discord.RichEmbed()
  .setColor(message.guild.me.displayHexColor)
  .setTitle("Server Info")
  .setThumbnail(message.guild.iconURL)
  .setAuthor(`${message.guild.name}`, message.guild.iconURL)
  .addField("**Server Name:**", `${message.guild.name}`, true)
  .addField("**Server Owner:**", `${message.guild.owner}`, true)
  .addField("**Member Count:**", `${message.guild.memberCount}`, true)
  .setFooter(`WeebMaster`, client.user.displayAvatarURL);

  message.channel.send({embed: siEmbed});
}

module.exports.config = {
  name: "serverinfo",
  aliases: ["si", "info"],
  description: "Show information about this server",
  category: 'util'
}
