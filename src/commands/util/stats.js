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
    let per 
    var os = require('os-utils'); 
    os.cpuUsage(function(v){ 
    msg.client.shard.broadcastEval('this.guilds.size').then(gui => {
   msg.client.shard.broadcastEval('this.users.size').then(use => {
    var embed = new RichEmbed()
    .setTitle("My status!")
    .setColor(0xFF0090)
    .addField("Commando Framework version: `"+ require('discord.js-commando').version +"`", "**Discord.JS version: ** `"+ require('discord.js').version +"`")
    .addField("Guilds: `"+ parseInt (parseInt(gui[0]) + parseInt(gui[1])) +"`", "**Users:** `"+ parseInt (parseInt(use[0]) + parseInt(use[1])) +"`")
    .addField("RAM usage: `"+ ""+ `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, "**CPU Usage:** `"+ v +"%`")
    return msg.channel.send(embed);
      });
    });
    });
  }
};

module.exports = StatsCommand;