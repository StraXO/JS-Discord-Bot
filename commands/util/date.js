module.exports.run = async (client, message, args) => {
  var date = new Date,
    dformat = [(d.getMonth()+1).padLeft(),
               d.getDate().padLeft(),
               d.getFullYear()].join('/') +' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');
//=> dformat => '05/17/2012 10:52:21'
  message.channel.send(date);
}

module.exports.config = {
  name: "Date",
  aliases: ["time", "getdate", "currentdate", "whattime", "clock"],
  description: "Get information about the current time and date",
  category: 'util',
  usage: `date`,
  accessableby: "Members"
}
