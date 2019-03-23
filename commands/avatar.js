exports.run = (client, message, args, ops) => {
	if (message.author.id === ops.ownerID) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		}
		//multiple users
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		});

		message.channel.send(avatarList);
	} else {
		message.channel.send("You have insifficient permissions to run this command");
	}
}
