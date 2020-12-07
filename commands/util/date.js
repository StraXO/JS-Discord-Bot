module.exports.run = async (client, message, args) => {
  let date = new Date().toUTCString().toLocaleString('en-US', {
    timeZone: "Europe/Brussels"
  });

  message.channel.send(date);
}

module.exports.config = {
  name: "date",
  aliases: ["time", "getdate", "currentdate", "whattime", "clock"],
  description: "Get information about the current time and date",
  category: 'util',
  usage: `date`,
  accessableby: "Members"
}
