exports.run = (client, message, args) => {
  const attachment = new Discord.Attachment('https://i.imgur.com/w3duR07.png');
  message.channel.send(attachment);
}
