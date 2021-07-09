

const repldb = require("@replit/database");
const db = new repldb();
const botdevs = ["423258218035150849", "314166178144583682"];
const discord = require("discord.js");
exports.info = {
	name: "setup",
	alts: [],
	description: "Configure GSB"
};

exports.run = async function(bot, msg, args) {
  try {
    if (!msg.member.permissions.has("MANAGE_SERVER") || !msg.author.id == "423258218035150849") {
      msg.channel.send("Missing perms (You need MANAGE_SERVER to use this!)");
    } else {
      const message = await msg.channel.send("Please wait... setting up guild server suggestions notifications in this channel");
      if (!(await db.get("channels"))[0]) {
        await db.set("channels", []);
      }
      const channels = await db.get("channels");
      if (channels.indexOf(msg.channel.id) > -1) {
        message.edit("<:no:752917235349061774> This channel is already configured for Guild Server Notifications!")
        return;
      } else {
        channels.push(msg.channel.id)
        await db.set("channels", channels);
        message.edit("<:yes:752917196950339614> Configured Guild Server Notifications!")
      }
    }
  } catch {
    msg.channel.send("Somethings not right")
  }
};
