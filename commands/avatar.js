exports.run = (client, message, args) => {
if (!message.mentions.users.size) {
		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
	}

	const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
	});

	// send the entire array of strings as a message
	// by default, discord.js will `.join()` the array with `\n`
	let file =
	message.channel.send(avatarList);
}
