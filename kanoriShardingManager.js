var { ShardingManager } = require("discord.js");
var x = 0;
var Website = require('./src/util/WebsiteLoader')
var kanoriWebsite = new Website()
var kanoriManager = new ShardingManager('./kanori.js', { totalShards: 2, respawn: true });

console.log("Loading Kanori shards...");

kanoriManager.on('launch', (shard) => {
  console.log("Loading shard "+ shard.id);
});

kanoriManager.on('message', (shard, msg) => {
  console.log("Eval for Shard "+ shard.id +":\nEvaluted: "+ msg._eval +"\nResult: "+ msg._result)
});

kanoriManager.spawn().then(() => {
  console.log("Success spawning all shard");
});