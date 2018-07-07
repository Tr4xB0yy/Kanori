var { ShardingManager } = require("discord.js");
var x = 0;
var website = require('./src/util/WebsiteLoader')
var kanoriWebsite = new website()
var kanoriManager = new ShardingManager('./kanori.js', { totalShards: 2, respawn: true });

console.log("Loading Kanori shards...");

kanoriManager.on('launch', (shard) => {
  console.log("Loading shard "+ shard.id);
});

kanoriManager.on('message', (shard, msg) => {
  console.log("Message from shard "+ shard.id +":\n\n"+ msg)
});

kanoriManager.spawn().then(() => {
  console.log("Success spawning shard "+ x);
  x++
});