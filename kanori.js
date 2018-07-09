/*
  Heyy! My name is Kanori.
  I'm a moderation bot & utils built with Commando Framework!
*/
var { Client, FriendlyError } = require('discord.js-commando');
var path = require('path');
var { RichEmbed } = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo');
var snekfetch = require('snekfetch')

console.log('Loading Kanori client...');


// Calling CanvasCommands instance to load all buffers.
console.log("Loading CanvasCommand client (buffers and fonts)...");
var CanvasClient = require('./src/util/CanvasCommand'); // tudo lá é estático
CanvasClient.loadResources().then(msg => {
  console.log(msg);
});

// Loading NSFW Check API
var NSFW = require ('/app/src/util/NSFWCheck');
var NSFWCheck = new NSFW();

var PluginManager = require ('/app/src/util/PluginManager');
var manager = new PluginManager();
manager.loadPlugins();

var botlist = require('/app/src/util/BotList');


var client = new Client({
  owner: "201710904612618240",
  commandPrefix: "k.",
  unknownCommandResponse: false,
  disableEveryone: true
});


client.setProvider(
    MongoClient.connect(process.env.MONGOURI).then(cliente =>
    new MongoDBProvider(cliente, "kanori"))            
).catch(console.error);

client.registry.registerGroups([
  ['moderation', 'Moderation'],
  ['fun', 'Funny'],
  ['test', 'Testing'],
  ['misc', 'Misc']
]).registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({ 'ping': false, 'reload': false, 'help': false})
  .registerCommandsIn(path.join(__dirname, 'src/commands'));
client.on('ready', () => {
  console.log("Kanori is online! Yay!");
  client.user.setActivity("anime | @Kanori help", { type: "WATCHING" });
  var Database = require('./src/util/UserDB')
  var database = new Database({ uri: process.env.MONGOURI })
  client.db = database
  console.log("Posting stats to DBL and Listcord");
  var botlistClient = new botlist({ client: client });
})
.on('error', console.error)
.on('warn', console.warn)
.on('message', msg => {
  if (msg.content.startsWith('<@'+ client.user.id +'>') && !msg.content.split(" ").slice(1).join(" ")) {
    msg.channel.send(":wave: | Heya, my name is Kanori.\nFor help, use `@Kanori help`\nFor info, use `@Kanori botinfo`");
  }
})
.on('debug', (msg) => {
  msg = msg.replace(process.env.TOKEN, "TOKEN")
  console.log(msg)
})
.on('guildMemberAdd', (member) => {
  if (member.guild.id !== "425865939691765760") return;
  NSFWCheck.check(member.user.displayAvatarURL, process.env.NSFWAPI).then(result => {
    var embed = new RichEmbed()
    .setTitle("🚫 NSFW Detected!")
    .setDescription("**Hey! I checked "+ member.user.tag +" avatar and i found NSFW on it! Please do something.**\n\n**Avatar Link:** [Click Here]("+ member.user.displayAvatarURL +")")
    .setColor(0xFF0000)
    if (result == "adult") return member.guild.channels.get("425865939691765760").send("<@354233941550694400>", { embed });
  });
})
.on('messageDelete', (msg) => {
  if (!msg.mentions.users.first()) return;
  var alreadyCheck = []
  msg.mentions.users.forEach(async (user) => {
    if (!alreadyCheck.includes(user.id) && user.id !== msg.author.id) {
      var userPfp = await client.db.getUser(user.id)
      if (userPfp.mentionWarn) {
        var embed = new RichEmbed()
        .setTitle("Someone mention you and deleted it!")
        .setColor(0xFF0000)
        .setThumbnail(msg.author.displayAvatarURL)
        .setDescription("**Message content**\n"+ msg.content)
        .addField("User: `"+ msg.author.tag +"("+ msg.author.id +")`", "Guild: `"+ msg.guild.name +"`")
        try {
          client.users.get(user.id).send(embed)
        } catch (e) {}
        alreadyCheck.push(user.id)
      }
    }
  });
})
.on('disconnect', () => console.log("Kanori got disconnected! Trying to reconnecting."))
.on('reconnecting', () => console.log("Trying to reconnecting Kanori to Discord..."))
.on('commandError', (cmd, err) => {
  if(err instanceof FriendlyError) return;
	console.error(`Oopsie Woopsie! Error in command ${cmd.groupID}:${cmd.memberName}!`, err);
});

client.login(process.env.TOKEN);