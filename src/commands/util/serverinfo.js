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
    var cleanRoles = []
    var roles = msg.guild.roles.array()
    for (var i = 0; i < msg.guild.roles.array().length; i++) {
      if (cleanRoles.join(', ').length > 1000) {
        cleanRoles.pop()
        cleanRoles.push("etc")
        break
      }
      cleanRoles.push(roles[i].name)
    }
    var embed = new RichEmbed ()
    .setTitle(msg.guild.name +"'s info")
    .setThumbnail(msg.guild.iconURL)
    .setColor(0xFF0090)
    .addField("Guild ID", msg.guild.id)
    .addField("Joined at", msg.guild.createdAt)
    .addField("I joined here at", msg.member.joinedAt)
    .addField("Member count", msg.guild.members.size)
    .addField("Roles in this server", "```"+ cleanRoles.join(', ') +"```")
    return msg.channel.send(embed);
  }
};

module.exports = ServerInfoCommand;