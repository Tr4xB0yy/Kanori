const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class StatsCommand extends Command {
  constructor (client) {
    super (client, {
      name: "stats",
      aliases: ["status"],
      group: "util",
      memberName: "stats",
      description: "My status, master!",
      guildOnly: false
    });
  }
  async run (msg) {
    var os = require('os-utils'); 
// os.cpuUsage(function(v){ 
        var embed = new RichEmbed()
        .setTitle("Info for shard "+ msg.client.shard.id)
        .setColor(0xFF0090)
        .addField("Commando Framework version: `"+ require('discord.js-commando').version +"`", "**Discord.JS version: ** `"+ require('discord.js').version +"`")
        .addField("Guilds in this shard `"+ msg.client.guilds.size +"`", "**Users in this shard:** `"+ msg.client.users.size +"`")
        .addField("Ping in this shard: `"+ Math.round(msg.client.ping) +"ms`", "**OS Arch:** `"+ process.arch +"`")
        .addField("RAM usage: `"+ ""+ `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, "**CPU Usage:** `ERR!`")
        return msg.channel.send(embed);
   // });
  }
}

module.exports = StatsCommand;