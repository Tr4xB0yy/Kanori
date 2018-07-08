const { Command } = require('discord.js-commando');

class InviteCommand extends Command {
  constructor (client) {
    super (client, {
      name: "invite",
      group: "util",
      memberName: "invite",
      description: "My invite to add me on your server!",
      guildOnly: false,
    });
  }
  async run (msg) {
    var { RichEmbed } = require ('discord.js');
    var embed = new RichEmbed ()
    .setTitle("Oh... Do you want add me?")
    .setDescription("You can add me to your server with the link: [Click Me!](https://discordapp.com/api/oauth2/authorize?client_id=461552010240589824&permissions=8&scope=bot) ")
    .addField(":warning: Warning", "If you want use all functions, you need give me the Admininstrator permission.")
    .setColor(0xFF00F0)
    msg.channel.send(embed)
  }
}

module.exports = InviteCommand;