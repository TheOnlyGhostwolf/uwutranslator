const Discord = require("discord.js");
const dotenv = require("dotenv").config();
const axios = require("axios");
const token = process.env.TOKEN;
const webhook = process.env.WEBHOOK;
const errorwebhook = process.env.ERROR_WEBHOOK;
const dbltoken = process.env.DBLTOKEN;
const developer = process.env.DEVELOPER;

const client = new Discord.Client();

const clean = text => {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
};




const faces = [
  "(・`ω´・)",
  ";;w;;",
  "owo",
  "UwU",
  ">w<",
  "^w^",
  "✧w✧",
  "♥w♥",
  "(˘³˘)",
  "(。U⁄ ⁄ω⁄ ⁄ U。)",
  "(ᵘʷᵘ)",
  "(ᵕᴗ ᵕ⁎)",
  "uwU",
  "◔w◔",
  "⓪w⓪",
  "‿︵𝓇𝒶𝓌𝓇‿︵ ʘwʘ",
  "øwø",
  "ÓwÓ",
  "ÕwÕ",
  "@w@",
  "ᅌwᅌ",
  "ʘwʘ",
  "(✿◠‿◠)",
  "(●´ω｀●)",
  "(づ｡◕‿‿◕｡)づ",
  "≧◡≦",
  "(◡‿◡✿)",
  "(\*^ -^\*)",
  "(∪ ◡ ∪)",
  "(✿◠‿◠)",
  "╰(◡‿◡✿╰)",
  "(ﾉ◕ヮ◕)ﾉ\*:･ﾟ✧",
  "(￣ｰ￣)",
  "ヽ(゜∇゜)ノ",
  "(◕ω◕✿)",
  "(〃^∇^)ﾉ",
  "(\´｡• ᵕ •｡`)",    
  "ヽ(>∀<☆)ノ",    
  "ヽ(\*・ω・)ﾉ",    
  "☆ ～('▽^人)",
  "(´ ω \`♡)",    
  "(๑˃ᴗ˂)ﻭ",
  "( ´ ▽ \` ).｡ｏ♡",
  "╰(\*´︶`\*)╯♡",
  "ヽ(♡‿♡)ノ",    
  "( ´ ∀ `)ノ～ ♡",
  "♡ ～('▽^人)",
  "( ´ ▽ \` ).｡ｏ♡",
  "Σ>―(〃°ω°〃)♡→",   
  "(´,,•ω•,,)♡",      
  "( ˘⌣˘)♡(˘⌣˘ )",  
  "(„ಡωಡ„)",    
  "(ノ\*°▽°\*)",       
  "(｡･ω･｡)ﾉ♡",
  "(=^･ω･^=)",
  "╰(◡‿◡✿╰)",
  "(´･ω･\`)"
];

const statuses = [
  "with uwu faces",
  'a game called "OwO what\'s this?!?"',
  "*notices shitpost* uwu what's this?",
  "@mention me to uwu-ify messages",
  "with s-senpai~~",
  "with the big bul... OwO",
  "Hewwo? Hewwo?!? Intewnaw bweeding u say? owo",
  "Coded by code monkeys at uwu headquawews",
  "Hewwo dewr~!"
];

function Owoify(str) {
  str = str.replace(/(?:r|l)/g, "w");
  str = str.replace(/(?:R|L)/g, "W");
  str = str.replace(/n([aeiou])/g, "ny$1");
  str = str.replace(/N([aeiou])/g, "Ny$1");
  str = str.replace(/N([AEIOU])/g, "NY$1");
  str = str.replace(/ove/g, "uv");
  str = str.replace(/god/g, "gawd");
  str = str.replace(/God/g, "Gawd");
  str = str.replace(/father/gi, "daddy");
  str = str.replace(/papa/gi, "papi");
  str = str.replace(/mom/g, "mommy");
  str = str.replace(/mother/g, "mommy");

  return str;
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

client.on("ready", () => {
  axios.post(
    webhook,
    {
      content:
        "Bot has started, with " +
        client.users.size +
        " users, in " +
        client.channels.size +
        " channels of " +
        client.guilds.size +
        " guilds."
    }
  );

  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setActivity(
    `${
      statuses[Math.floor(Math.random() * statuses.length)]
    } | @${client.user.username} --help`
  );
});

client.on("guildCreate", guild => {
  axios.post(
    webhook,
    {
      content:
        ":green_square: New guild joined: " +
        guild.name +
        " (id: " +
        guild.id +
        "). This guild has " +
        guild.memberCount +
        " members!"
    }
  );

  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
});

client.on("guildDelete", guild => {
  axios.post(
    webhook,
    {
      content:
        ":red_square: I have been removed from: " +
        guild.name +
        " (id: " +
        guild.id +
        ")"
    }
  );

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  if (message.author.bot) return;
  
  const errored = error => {
          if (error.code == 50013)
            message.channel
              .send(
                ":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Embed Links** in this server."
              )
              .catch(oof => {
                message.author
                  .send(
                    ":x: Oh no qwq! I don't have proper permissions to send you the content! Please make sure I have permissions to **Send Messages** in that server."
                  )
                  .catch(err2 => {
                    if (err2.code == 50007) {
                      axios.post(
                        webhook,
                        {
                          content:
                            ":x: I tried sending an error DM to " +
                            message.author.tag +
                            ", but they have their DMs closed :|"
                        }
                      );
                    }
                  });
              });
          else {
            const errorid = makeid(6);
            axios.post(
              errorwebhook,
              {
                content:
                  "`" +
                  errorid +
                  "` - " +
                  message.author.tag +
                  " - ID: " +
                  message.author.id +
                  ":\n```" +
                  error + "```"
              }
            );
            message.author
              .send(
                "Hi there! Something went wrong while executing your command. If you need more help, you can join my support server @ <https://discord.gg/eq6kwNJ> and give this code for error troubleshooting: `" +
                  errorid +
                  "`"
              )
              .catch(err2 => {
                if (err2.code == 50007) {
                  axios.post(
                    errorwebhook,
                    {
                      content:
                        ":x: I tried sending a DM to " +
                        message.author.tag +
                        "about the error `" +
                        errorid +
                        "` but they have their DMs closed :|"
                    }
                  );
                }
              });
          }
        };

  if (message.isMentioned(client.user)) {
    const messagebutstring = message.content;
    if (
      messagebutstring.startsWith("<@!" + client.user.id + ">") ||
      messagebutstring.startsWith("<@" + client.user.id + ">")
    ) {
      const args = message.content
        .slice(22)
        .trim()
        .split(/ +/g);
      const command = args.shift();

      axios.post(
        webhook,
        {
          content:
            ":robot: Command ran by " +
            message.author.username +
            "#" +
            message.author.discriminator +
            " (ID: " +
            message.author.id +
            "): " +
            command +
            " " +
            args
        }
      );

      if (command == "" || command == " ") {
        message.channel.send(
          "Hewwo <@" +
            message.author.id +
            ">! (^w^)/\nI'm **${client.user.username}**, I uwu-ify messages. If you want to check how to use me, use **<@!635507578008240165> --help** command :3"
        )
        .catch(error => errored(error));
      } else if (command === "--ping") {
        const m = await message.channel.send("Ping?").catch(error => errored(error));
        m.edit(
          `Pong! Latency is ${m.createdTimestamp -
            message.createdTimestamp}ms. API Latency is ${Math.round(
            client.ping
          )}ms`
        ).catch(error => errored(error));
      } else if (command === "--shutdown") {
        let isBotOwner = message.author.id == developer;
        if (!isBotOwner) {
          message.channel.send(
            ":warning: Only the bot developer can use this command"
          );
          return;
        }

        message.channel
          .send("I-I don't feel so good... qwq | Shutting down...")
          .then(m => {
            client.destroy();
          });
      } else if (command == "uwu" || command == "owo") {
        message
          .reply(faces[Math.floor(Math.random() * faces.length)]).catch(error => errored(error))
      } else if (command === "--eval") {
        let isBotOwner = message.author.id == developer;
        if (!isBotOwner) {
          message.channel.send(
            ":warning: Only the bot developer can use this command"
          );
          return;
        }

        try {
          const code = args.join(" ");
          let evaled = eval(code);

          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

          message.channel.send(clean(evaled), { code: "xl" }).catch(error => errored(error));
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      } else if (command === "--help") {
        let helpembed = new Discord.RichEmbed({
          title: "**Hewwo! I'm uwutranslator!**",
          description:
            "I uwu-ify messages. @mention me and type any text for me to translate! >wO\n\nExample: **@uwutranslator Hello world! I am alive!**\n"
        });

        helpembed.setFooter(
          message.author.displayAvatarURL,
          message.author.username + "#" + message.author.discriminator
        );
        helpembed.setThumbnail(
          "https://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif"
        );
        helpembed.addField("Developer", "Ghostwolf#6735", true);
        helpembed.addField(
          "Add me to your server!",
          "[Click here](https://discordapp.com/oauth2/authorize?client_id=635507578008240165&permissions=84992&scope=bot)",
          true
        );
        helpembed.addField("Special thanks", "Tea, Dragonic, Pretzel", true);
        helpembed.addField(
          "Website",
          "[Click here](https://uwutranslator.ghostwolf.me)",
          true
        );
        helpembed.addField(
          "Support the developer!",
          "[Buy me a coffee!](https://ko-fi.com/ghostwolf)",
          true
        );
        helpembed.addField(
          "Vote for me on DBL!",
          "[Click here](https://top.gg/bot/635507578008240165/vote)",
          true
        );
        helpembed.setColor(16761576);
        helpembed.setTimestamp(message.createdAt);
        helpembed.setFooter(
          "Requested by " +
            message.author.username +
            "#" +
            message.author.discriminator,
          message.author.avatarURL
        );

        message.channel.send(helpembed).catch(error => errored(error))
      } else {
        const str = command + " " + args.join(" ");

        /*console.log(str);
        axios.post(
          webhook,
          {
            content: str
          }
        );*/

        const uwufiedstr =
          Owoify(str) +
          " " +
          faces[Math.floor(Math.random() * faces.length)] +
          " ";

        let uwuembed = new Discord.RichEmbed({
          description: uwufiedstr
        });

        uwuembed.setColor(16761576);
        uwuembed.setFooter(
          "Requested by " +
            message.author.tag +
            " | @mention me to uwu-ify messages",
          message.author.avatarURL
        );

        message.channel.send(uwuembed).catch(error => errored(error))
      }
    }
  }
});

client.login(token);



const DBL = require("dblapi.js");
const dbl = new DBL(dbltoken, client);

// Optional events
dbl.on('posted', () => {
      axios.post(
        webhook,
        {
          content: ":thumbsup: Just posted my server count to DBL!"
        }
      );
})

dbl.on('error', e => {
      axios.post(
        webhook,
        {
          content: ":fire: Something went wrong while trying to post server count to DBL: " + e
        }
      );
})
