const Discord = require('discord.js');

module.exports.run = async (client, message, args, guildConf) => {
    //single user
    if (!message.mentions.users.size) {
        return message.channel.send({
            embed: {
                "title": `Your profile image`,
                "image": {
                    "url": `${message.author.displayAvatarURL}`
                }
            }
        });
    }

    //multiple users
    const avatarList = message.mentions.users.map(user => {
        return user.username + "'s avatar " + user.displayAvatarURL;
    });

    message.channel.send(avatarList);
}

module.exports.config = {
  name: "avatar",
  aliases: ["ava", "getavatar"],
  description: "Get the avatar of an user",
  category: 'util',
  usage: `avatar <@Users>`,
  accessableby: "Members"
}
