const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class ServerInfoCommand extends Command {
  constructor (client) {
    super (client, {
      name: "serverinfo",
      aliases: ["sinfo"],
      group: "util",
      memberName: "serverinfo",
      description: "Get info about a server",
      guildOnly: true
    });
  }
  async run (msg) {
    var embed = new RichEmbed ()
    .setTitle(msg.guild.name +"'s info")
    .setThumbnail(msg.guild.iconURL)
    .setColor(0xFF0090)
    .addField("Guild ID", msg.guild.id)
    .addField("Joined at", msg.guild.createdAt)
    .addField("I joined here at", msg.member.joinedAt)
    .addField("Member count", msg.guild.members.size)
    .addField("Roles in this server", "```"+ msg.guild.roles.map(roles => roles.name).join(', ') +"```")
    return msg.channel.send(embed);
  }
};

module.exports = ServerInfoCommand;