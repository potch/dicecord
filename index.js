const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

const TOKEN = process.env.DISCORD_TOKEN;

function roll(s) {
  s = s.replace(/\s+/g, "");
  // parse command
  let command = s.match(/^(\d*)d(\d+)(k\d+)?([\+\-]\d+)?/);
  // no command found? we are done
  if (!command) return `sorry, I didn't quite get that`;
  let [full, count, sides, keep, mod] = command;
  count = parseInt(count, 10) || 1;
  // prevent dice griefing
  if (count > 20) {
    return "a bit too dicey for me...";
  }
  sides = parseInt(sides, 10);
  if (sides < 2 || sides > 1000) {
    return "whose side are you on?";
  }
  // determine how many dice to keep
  if (keep) {
    keep = parseInt(keep.slice(1), 10) || count;
  } else {
    keep = count;
  }
  // and how much to modify the total by
  mod = parseInt(mod, 10) || 0;

  // roll them bones
  let rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push({
      keep: true,
      value: Math.floor(Math.random() * sides) + 1,
    });
  }

  // keep what we need
  if (keep < count) {
    for (let i = count; i > keep; i--) {
      let lowest = null;
      for (let roll of rolls) {
        if (!roll.keep) continue;
        if (!lowest || roll.value < lowest.value) {
          lowest = roll;
        }
      }
      lowest.keep = false;
    }
  }

  // let's total it up
  let sum = 0;
  for (let roll of rolls) {
    if (roll.keep) {
      sum += roll.value;
    }
  }
  sum += mod;

  // format the result
  let out = `(${rolls
    .map((r) => (r.keep ? r.value : `~~${r.value}~~`))
    .join(" + ")})`;
  if (mod) out += mod < 0 ? " - " + Math.abs(mod) : " + " + mod;
  out += ` = **${sum}**`;
  return out;
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(
    `https://discordapp.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=bot`
  );
});

client.on("message", (msg) => {
  if (msg.content.startsWith("/r ")) {
    try {
      let result = roll(msg.content.slice(3));
      msg.channel.send(result);
    } catch (e) {
      console.error(e);
      msg.channel.send("my brain melted on that one, my bad");
    }
  }
});

client.login(TOKEN);
