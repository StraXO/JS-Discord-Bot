const Discord = require('discord.js')

exports.run = (client, message, args) => {
  message.channel.send("", {
    file: "https://i.imgur.com/w3duR07.png"
  });
}

module.exports.config = {
  name: "rip",
  aliases: ["dead"]
}
