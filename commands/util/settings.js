const Discord = require('discord.js')

exports.run = (client, message, args, guildConf, pool) => {
  if (message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');

    if(!message.channel.permissionsFor(message.author).has("MANAGE_CHANNELS")) {
      return message.reply("You don't have the permissions to change the prefix!");
    }

    // This is array destructuring
    const [prop, ...value] = args;

    if (!prop || prop === "show" || prop === "list" || prop === "current") {
      //show settings overview
      let configProps = Object.keys(guildConf).map(prop => {
        return `${prop}  :  ${guildConf[prop]}\n`;
      });
      return message.channel.send(`The following are the server's current configuration:
      \`\`\`${configProps}\`\`\``);

    } else {
      // settings
      let settingFile = client.setting.get(prop);

      if (settingFile) {
        settingFile.run(client, message, args, guildConf, pool);
      }
    }
}

module.exports.config = {
  name: "settings",
  aliases: ["options", "config", "setting"],
  description: "Show or change bot settings",
  category: 'util',
  usage: `settings <setting> <value> | settings (list, show, current)`,
  accessableby: "Admins"
}
