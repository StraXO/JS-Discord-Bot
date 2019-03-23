exports.run = async(client, message, args) => {
  // Check the following permissions before deleting messages:
      //    1. Check if the user has enough permissions
      //    2. Check if I have the permission to execute the command

      if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        return;
      } else if (!message.channel.permissionsFor(client.user).hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        return;
      }

      // Only delete messages if the channel type is TextChannel
      // DO NOT delete messages in DM Channel or Group DM Channel
      let deleteAmount = parseInt(args[0], 10);
      let deleteMax = 20;

      if (!isNan(deleteAmount)) {
        if (message.channel.type == 'text' && deleteAmount > 0 && deleteAmount < deleteMax+1) {
          message.channel.fetchMessages({limit: deleteAmount + 2})
            .then(messages => {
              message.channel.bulkDelete(messages);
              messagesDeleted = messages.array().length; // number of messages deleted

              // Logging the number of messages deleted on both the channel and console.
              message.channel.send("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
              console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
            })
            .catch(err => {
              console.log('Error while doing Bulk Delete');
              console.log(err);
            });
        } else if (deleteAmount < 1 || deleteAmount > 100) {
            message.channel.send(`Cannot delete ${deleteAmount} messages. Please use a value between 1 and ${deleteMax}`);
        }
      } else {
        message.channel.send("Please enter a valid number");
      }
}
