const { Command } = require('discord.js-commando');

class MessageSCommand extends Command {
  constructor (client) {
    super (client, {
      name: "searchmessage",
      aliases: ["message"],
      group: "misc",
      memberName: "searchmessage",
      throttling: {
        usages: 2,
        duration: 5
      },
      description: "Search a message on the actual channel.",
      examples: ['message 464785943652597760'],
      guildOnly: false,
      args: [{
        key: 'text',
        label: 'text',
        prompt: "Enter the ID of the message.",
        type: "string"
      }]
    });
  }
  async run (msg, args) {
    var id = args.text;
    var x = 0
    var guildChannels = await msg.client.guilds.get(msg.guild.id).channels
    var awa = await msg.channel.send("Searching... Loops are cool.")
    guildChannels.forEach(async channel =>{
      if (channel.type == 'text') {
      var msgs = channel.fetchMessages()
      msgs.forEach(async message => {
      if (message.id == id) {
        msg.channel.createWebhook(message.member.nickname, message.author.avatarURL).then(hook => {
          awa.delete()
          return hook.send(message.content)
          x = x++
        });
        awa.edit("I don't found this message on <#"+ channel.id +">, let's try another channel.");
      }
    });
      }
    });
    setTimeout(() => { if (x == 0) msg.channel.send('I don\'t found this message on this guild!'); }, 10000);
  
    }
};

module.exports = MessageSCommand;