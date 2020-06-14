const Discord = require("discord.js");
const client = new Discord.Client();
const { OpusEncoder } = require("@discordjs/opus");
const encoder = new OpusEncoder(48000, 2);
const { prefix, token, embedColor, botName, inviteURL, streamURL } = require("./config.json");

client.on("ready", () => {
  client.user.setActivity(`${botName} 24/7`, { type: "LISTENING" });
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`In ${client.guilds.cache.size} server`);
});

client.on("guildCreate", guild => {
  const messageGuildCreate = `**Thanks for invite me to ${guild.name} 
   Enjoy , ${botName} bot 📻
   Prefix: \`${prefix}\`**
   `;
  guild.owner.send(messageGuildCreate);
  console.log(
    `${botName} bot added to ${guild.name}, total ${client.guilds.cache.size}.`
  );
});

client.on("message", message => {
  if (message.content === `${prefix}help`) {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(`${botName} commands: `)
      .addFields(
        {
          name: `\`${prefix}radio\``,
          value: `**To start listening to ${botName}.**`,
          inline: true
        },
        {
          name: `\`${prefix}volume\``,
          value: `**To set ${botName} volume**`,
          inline: true
        },
        {
          name: `\`${prefix}pause\``,
          value: `**To pause listening to ${botName}.**`,
          inline: true
        },
        {
          name: `\`${prefix}resume\``,
          value: `**To resume listening to ${botName}.**`,
          inline: true
        },
        {
          name: `\`${prefix}stop\``,
          value: `**To stop listening to ${botName},**`,
          inline: true
        },
        {
          name: `\`${prefix}help\``,
          value: "**This commands.**",
          inline: true
        },
        {
          name: `\`${prefix}invite\``,
          value: "**To send you invite link.**",
          inline: true
        }
      )
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL()
      );
    message.channel.send(helpEmbed);
  }
});

client.on("message", message => {
  if (message.content === `${prefix}invite`) {
    const supportEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(`Click me to invite ${botName} to your server!`)
      .setURL(inviteURL)
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL()
      );
    message.channel.send(supportEmbed);
  }
});

client.on("message", async message => {
  if (message.content === `${prefix}radio`) {
    if (!message.member.voice.channel) return message.channel.send("**:x: You must be in a voice channel to use this command.**");
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(streamURL);
    dispatcher.on("start", () => {
      const radioEmbed = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(
          `:musical_note: **Playing __${botName}__ in** \`${
          message.member.voice.channel.name
          }\`.`
        );
      message.channel.send(radioEmbed);
    });
  }
  else if (message.content.startsWith(`${prefix}volume`)) {
    let args = message.content.split(" ").slice(1);
    let argresult = args.join(' ');
    if (!message.member.voice.channel) return message.channel.send("**:x: You must be in a voice channel to use this command.**");
    if (!argresult) return message.channel.send(`\`${prefix}volume\` **0-100**`);
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(streamURL);
    dispatcher.setVolume(argresult);
    const radioEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(`:loud_sound: **Volume: \`${argresult}\`**`)
    message.channel.send(radioEmbed);
  }
  else if (message.content === `${prefix}pause`) {
    if (!message.member.voice.channel) return message.channel.send("**:x: You must be in a voice channel to use this command.**");
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(streamURL);
    dispatcher.destroy();
    const pauseEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(":pause_button: **Paused!**");
    message.channel.send(pauseEmbed);
  } else if (message.content === `${prefix}resume`) {
    if (!message.member.voice.channel) return message.channel.send("**:x: You must be in a voice channel to use this command.**");
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(streamURL);
    dispatcher.resume();
    const resumeEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(":play_pause: **Resumed!**");
    message.channel.send(resumeEmbed);
  } else if (message.content === `${prefix}stop`) {
    if (!message.member.voice.channel) return message.channel.send("**:x: You must be in a voice channel to use this command.**");
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(streamURL);
    connection.disconnect();
    const stopEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(":stop_button: **Stopped!**");
    message.channel.send(stopEmbed);
  }
});

client.login(token);
