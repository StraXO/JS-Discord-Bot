module.exports.run = async (client, message, args) => {
  var date = new Date,
    dformat = [(date.getMonth()+1).padLeft(),
               date.getDate().padLeft(),
               date.getFullYear()].join('/') +' ' +
              [date.getHours().padLeft(),
               date.getMinutes().padLeft(),
               date.getSeconds().padLeft()].join(':');
//=> dformat => '05/17/2012 10:52:21'
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
