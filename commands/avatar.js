exports.run = (client, message, args, guildConf) => {

	//single user
	if (!message.mentions.users.size) {
		return message.channel.send({embed: {
			"title": `Your profile image`,
	  	"image": {
	    	"url": `${message.author.displayAvatarURL}`
	  	}
		}});
	}

	//multiple users
	const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
	});

	message.channel.send(avatarList);
}
