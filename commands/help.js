const Discord = require('discord.js');

module.exports.run = async (client, message, args, guildConf) => {
  let siEmbed = new Discord.RichEmbed()
  .setColor(message.guild.me.displayHexColor)
  .setTitle("Command list")
  // .setAuthor(`${client.user.username}`, client.user.displayAvatarURL);
  client.commands.forEach(command => {
    //command vars
    let name = command.config.name;
    let alias = command.config.aliases.join(', ');
    let description = command.config.description;
    let useage = command.config.useage;

    return siEmbed.addField(`${name.charAt(0).toUpperCase() + name.slice(1)}`, (alias ? `**Alias**: ${alias}\n` : ``) + (description ? `**Description**: ${description}\n` : ``) + (useage ? `**Useage**: ${useage}\n` : ``));
  });
  siEmbed.setFooter(`${client.user.username}`, client.user.displayAvatarURL);

  return message.channel.send({embed: siEmbed});
}

module.exports.config = {
  name: "help",
  aliases: ["commands", "useage"],
  description: "Show this help dialog",
  useage: `help (command)`,
  accessableby: "Members"
}
