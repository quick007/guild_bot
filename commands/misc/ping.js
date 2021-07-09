const repldb = require("@replit/database");
const db = new repldb();
const botdevs = ["423258218035150849", "314166178144583682"];
const discord = require("discord.js");
exports.info = {
  name: "ping",
  alts: [],
  description: "😉"
};

exports.run = async function(bot, msg, args) {
  msg.channel.send("Ws Ping: "+ bot.ws.ping)
};