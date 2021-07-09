const http = require("http");
const express = require("express");
const app = express();
//webpage
{
  app.get("/*", (request, response) => {
    if (request.path === "/styles.css")
      return response.send(fs.readFileSync("assets/styles.css", "utf8"));
    response.send(fs.readFileSync("assets/home.html", "utf8")); // sends http status "OK"
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://guild_bot.luseufert5.repl.co/`);
  }, 280000); 
}

const discord = require("discord.js");
const replitdb = require("@replit/database");
const fs = require('fs');

const bot = new discord.Client();
const db = new replitdb();

const commands = new Map();
const prefix = 'gb ';
const suggestions = "801993544365637653";
const bugs = "801989390963965993";

bot.on("ready", async () => {
  process.env.token = "Nty lol";
  console.log("Connected to discord!");
  console.log("Loading commands!");
  //commands
  fs.readdir("./commands/", async (err, files) => {
    let dirs = files.filter(f => !f.includes("."));
    await dirs.forEach(async f => {
      await fs.readdir("./commands/" + f + "/", async (err, files) => {
        let jsf = files.filter(fi => fi.endsWith(".js"));
        await jsf.forEach(async cmd => {
          try {
            commands.set(
              require("./commands/" + f + "/" + cmd).info.name,
              "./commands/" + f + "/" + cmd
            );
            let alts = require("./commands/" + f + "/" + cmd).info.alts;
            alts.forEach(a => {
              commands.set(a, "./commands/" + f + "/" + cmd);
            });
          } catch { }
        });
      });
    });
  });
  console.log("Loaded all commands!");
  //presense (status)
  bot.user.setPresence({
    status: "idle",
    activity: { name: "waiting for guild bank spam to be stopped", type: "PLAYING" },
  });
  console.log("Bot loaded!")
  console.log("GSB Notification channels:", await db.get("channels"));
});

bot.on("message", async (msg) => {
  if (msg.channel.id === suggestions) {

    if (!msg.content.toLowerCase().startsWith("[nr]")) {
      await msg.react('<:yes:752917196950339614>');
      await msg.react('<:no:752917235349061774>');
    }
    (await db.get("channels") || []).forEach((channel) => {
      try {
        bot.channels.cache.get(channel).send(
          new discord.MessageEmbed()
            .setColor('#50792d')
            .setTitle("New Suggestion")
            .setDescription(msg.content + "\n")
            .addField("‎", "<:yes:752917196950339614> - **0**", true) .addField("‎", "<:no:752917235349061774> - **0**", true)
            .addField("_ _‎", `[Original message](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`)
            .setTimestamp()
            .setFooter(`Suggested by ${msg.author.tag}`, msg.author.avatarURL())
        );
      } catch {}
    })
  } else if (msg.channel.id === bugs) {
    await msg.react("<:confirmed:802425907897303090>");
  } else {
    //ping for no help
    if (msg.content.startsWith("<@!802003385376309279>")) {
      msg.channel.send("smh my head why the ping man, why the ping. ||(also the prefix is ` " + prefix + "` & theres no help command, so have fun!)||")
    } else {
      //commands
      if (!msg.content.toLowerCase().startsWith(prefix)) return;
      var args = msg.content.split(" ")
      if (prefix.includes(" ")) args.shift(1);
      const cmd = args[0].toLowerCase();
      if (!commands.has(cmd)) return;
      require(commands.get(cmd)).run(bot, msg, args);

    }
  }
})

bot.login(process.env.token);