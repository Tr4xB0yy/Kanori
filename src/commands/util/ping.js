const { Command } = require('discord.js-commando');
var { RichEmbed } = require('discord.js')

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Checks the bot\'s ping to the Discord server.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
    let emoji1
    let emoji2
    msg.client.shard.broadcastEval("this.ping").then(r => {
      if (r[0] <= 60) emoji1 = "Working without slowness"
      if (r[0] >= 60) emoji1 = "A little bit slow"
      if (r[0] >= 100) emoji1 = "Slow"
      if (r[0] >= 200) emoji1 = "Too much slow"
      if (r[1] <= 60) emoji2 = "Working without slowness"
      if (r[1] >= 60) emoji2 = "A little bit slow"
      if (r[1] >= 100) emoji2 = "Slow"
      if (r[2] >= 200) emoji2 = "Too much slow"
		  var embed = new RichEmbed()
      .setTitle("🏓 Pong!")
      .setColor("RANDOM")
      .addField("Shard 1 Ping: "+ emoji1, Math.round(r[0]))
      .addField("Shard 2 Ping: "+ emoji2, Math.round(r[1]))
      msg.channel.send(embed)
    });
  }
};