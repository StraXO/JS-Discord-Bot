const Discord = require('discord.js')

const categoryObj = {
  'fun': 'Fun',
  'util': 'Utility'
};

module.exports.run = async (client, message, args, guildConf) => {
  let siEmbed = new Discord.RichEmbed()
  .setColor(message.guild.me.displayHexColor)
  .setTitle(`${client.user.username} Commands`)
  // .setAuthor(`${client.user.username}`, client.user.displayAvatarURL);
  client.commands.forEach(command => {
    //Only show the command if its not hidden
    if (command.config.hideFromHelp === undefined || command.config.hideFromHelp === false) {
      //command vars
      let name = command.config.name;
      let alias = command.config.aliases.join(', ');
      let description = command.config.description;
      let usage = command.config.usage;

      return siEmbed.addField(`${name.charAt(0).toUpperCase() + name.slice(1)}`,
      (alias ? `**Alias**: ${alias}\n` : ``) +
      (description ? `**Description**: ${description}\n` : ``) +
      (usage ? `**Usage**: ${usage}\n` : ``));
    }
  });
  siEmbed.setFooter(`${client.user.username}`, client.user.displayAvatarURL);

  return message.channel.send({embed: siEmbed});
}

module.exports.config = {
  name: "help",
  aliases: ["commands", "usage"],
  description: "Show this help dialog",
  category: 'util',
  usage: `help`,
  accessableby: "Members"
}
