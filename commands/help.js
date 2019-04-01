module.exports.run = async(client, message, args, guildConf) => {
  let prefix = guildConf.prefix;

  const embed = {
  "title": `Useage: ${prefix}(command)`,
  "description": "For more info visit [Github](https://github.com/StraXO/WeebMaster). ```\nHelp, shows this help screen\navatar\nping\npurge\nrip\nsettings```",
  "url": "https://discordapp.com",
  "color": 13402724,
  "timestamp": "2019-04-01T09:06:00.435Z",
  "footer": {
    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
    "text": "footer text"
  },
  "fields": [
    {
      "name": "🤔",
      "value": "I AM NOT FINISHED..."
    },
  ]
};

  return message.channel.send("Commands:", {embed});
}
