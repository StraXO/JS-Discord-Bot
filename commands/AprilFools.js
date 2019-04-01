exports.run = async(client, message, args) => {
  //if (message.guild.name == "WeebDungeon") {
    const plushie = client.emojis.find(emoji => emoji.name === "Plushie");
    await message.react(plushie);
  //}
}
