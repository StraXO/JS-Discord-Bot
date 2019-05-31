module.exports.run = async (client, message, args) => {
  var d = new Date,
    dformat = [d.getMonth()+1,
       d.getDate(),
       d.getFullYear()].join('/')+' '+
       [d.getHours(),
       d.getMinutes(),
       d.getSeconds()].join(':');
       //=> dformat => '05/17/2012 10:52:21'

  message.channel.send("" + d);
}

module.exports.config = {
  name: "date",
  aliases: ["time", "getdate", "currentdate", "whattime", "clock"],
  description: "Get information about the current time and date",
  category: 'util',
  usage: `date`,
  accessableby: "Members"
}
