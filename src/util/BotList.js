var dblapi = require('dblapi.js')
var shard = require ('/app/src/util/ShardingUtils')
var Shard = new shard()

class BotList {
  constructor (opt = {}) {
    if (!opt.client) throw new ReferenceError("No client passed to the class.")
    this.client = opt.client
    this.init(this.client)
  }
  init (client) {
    console.log("Loading BotList class...");
    // UTILS area
    var count;
    
    // DBL area
    this.dbl = new dblapi(process.env.DBLTOKEN, { statsInterval: 900000/*, webhookAuth: process.env.DBLHOOKPASS, webhookPort: 30385*/ }, client)
    this.dbl.on('posted', () => {
      console.log("Posted stats to DBL.");
    });
    this.dbl.on('error', (err) => {
      console.error(err)
    });
    /*this.dbl.webhook.on('ready', hook => {
      console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
    });
    this.dbl.webhook.on('vote', async vote => {
      var guild = await Shard.getGuild('363338657840758784')
      var user = await Shard.getUser(vote.user)
      guild.channels.get('465240021822078978').send("Yay!\n`"+user.tag +"` vote me on DBL! >.<");
      console.log(`User with ID ${vote.user} just voted!`);
    });*/
    client.dbl = this.dbl
    // BOTSPW area
    
    
    // LISTCORD area
      const snekfetch = require('snekfetch')
      snekfetch.post(`https://listcord.com/api/bot/${client.user.id}/guilds`)
      .set("token", process.env.LISTCORDTOKEN)
      .send({
        guilds: client.guilds.size,
        shard: client.shard.id
      })
     .then(() => {
        console.log("Posted stats to LISTCORD.");
      });
    setInterval(async() => {
      const snekfetch = require('snekfetch')
      snekfetch.post(`https://listcord.com/api/bot/${client.user.id}/guilds`)
      .set("token", process.env.LISTCORDTOKEN)
      .send({
        guilds: client.guilds.size,
        shard: client.shard.id
      })
     .then(() => {
        console.log("Posted stats to LISTCORD.")
    });
    }, 900000)
    console.log("Loaded BotList module.")
  }
}

module.exports = BotList