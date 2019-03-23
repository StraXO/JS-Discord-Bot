exports.run = async(client, message, args, ops) => {
  const deleteCount = parseInt(args[0], 10);

  if(!deleteCount || deleteCount < 1 || deleteCount > 100)
    return message.reply("Please provide a number between 1 and 100");

  const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched).catch(error => console.log(`Couldn't delete messages because of: ${error}`));
  }
}
