var mongoose = require('mongoose')


var userSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  mentionWarn: {
    type: Boolean,
    default: false
  },
  xp: {
    type: Number,
    default: 0
  },
  money: {
    type: Number,
    default: 0
  },
  rep: {
    type: Number,
    default: 0
  },
  sobremim: {
    type: String,
    default: "Change this text using @Kanori aboutme. It's so easy men.."
  },
  banned: {
    type: Boolean,
    default: false
  }
})

var serverSchema = new mongoose.Schema({
  eventLog: {
    type: Boolean,
    default: false
  },
  eventLogChannel: {
    type: String,
    default: "no"
  },
  antiMassPing: {
    type: Boolean,
    default: false
  },
  _id: {
    type: String
  },
  bwf: {
    type: Array,
    default: []
  }
})

var modelUsers = mongoose.model("users", userSchema)
var modelGuilds = mongoose.model("guilds", serverSchema)

exports.users = modelUsers
exports.guilds = modelGuilds