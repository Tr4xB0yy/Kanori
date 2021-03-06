/*
  Heyy! My name is Kanori.
  I'm a moderation bot & utils built with Commando Framework!
*/
var { Client } = require('discord.js-commando')
var path = require('path');
var { readdir } = require('fs')
const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo')

console.log('Loading Kanori client...');
console.log("Loading CanvasCommand client (buffers and fonts)...");

var CanvasClient = require('./src/util/CanvasCommand');
CanvasClient.loadResources().then(msg => {
  console.log(msg);
});

var client = new Client({
  owner: "201710904612618240",
  commandPrefix: "k.",
  unknownCommandResponse: false,
  disableEveryone: true,
  autoReconnect: true,
  disabledEvents: ["TYPING_START", "TYPING_STOP"]
});

client.setProvider(MongoClient.connect(process.env.MONGOURI).then(cliente => new MongoDBProvider(cliente, "kanori"))).catch(console.error);

client.login(process.env.TOKEN)

client.registry.registerGroups([
  ['moderation', 'Moderation'],
  ['fun', 'Funny'],
  ['test', 'Testing'],
  ['misc', 'Misc'],
  ['social', 'Social']
]).registerDefaultTypes()
  .registerDefaultGroups()
  .registerDefaultCommands({ 'ping': false, 'reload': false, 'help': false})
  .registerCommandsIn(path.join(__dirname, 'src/commands'));
readdir('./src/listeners', function (e, files) {
  files.forEach(event => {
    var eventName = event.split(".")
    if (eventName[1] == "js") {
      var eventR = require('./src/listeners/'+ event)
      if (eventName[0] == "ready") {
        client.on('ready', () => eventR.run(client))
      } else {
        client.on(eventName[0], (...args) => eventR.run(...args))
      }
      delete require.cache[require.resolve('./src/listeners/'+ event)];
    }
  })
})