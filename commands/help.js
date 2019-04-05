module.exports.run = async(client, message, args) => {
  const embed = {
  "title": `Useage: **${client.settings.prefix}(command)**`,
  "description": "For more info visit [Github](https://github.com/StraXO/WeebMaster). ```\nhelp: shows this help screen\navatar\nping\npurge\nrip\nsettings```",
  "url": "https://discordapp.com",
  "color": 13402724,
  "timestamp": "2019-04-01T09:06:00.435Z",
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/558227965473980416/df9d3d3821b7791a4d86ffee92fd87bf.png?size=2048",
    "text": "WeebMaster"
  },
  "fields": [
    {
      "name": "Prefix",
      "value": "The current prefix is set to: '" + client.settings.prefix + "'"
    },
    {
      "name": "🤔",
      "value": "I AM NOT FINISHED..."
    }
  ]
};

  return message.channel.send("Commands:", {embed});
}
