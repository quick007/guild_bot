const repldb = require("@replit/database");
const db = new repldb();
const botdevs = ["423258218035150849", "314166178144583682"];
const discord = require("discord.js");
exports.info = {
  name: "say",
  alts: [],
  description: "😉"
};

exports.run = async function(bot, msg, args) {
  if (!botdevs.includes(msg.author.id)) return;
	if (!args[1]) {
		msg.channel.send("You need to provide a message!");
		return;
	}
	args.shift(1);
	msg.delete()
	msg.channel.send(args.join(" "));
};