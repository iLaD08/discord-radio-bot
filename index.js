const Discord = require("discord.js");
const fs = require('fs');


const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const CommandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of CommandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const { prefix, token, embedColor, botName, inviteURL, streamURL } = require("./config.json");

client.on("ready", () => {
  client.user.setActivity(`${botName} 24/7`, { type: "LISTENING" });
});

client.on('message', msg => {
  if (msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'help') client.commands.get('help').execute(Discord, msg, botName, prefix, embedColor)
  else if (command === 'radio') client.commands.get('radio').execute(Discord, msg, botName, streamURL, embedColor)
  else if (command === 'volume') client.commands.get('volume').execute(Discord, msg, args, streamURL, embedColor)
  else if (command === 'pause') client.commands.get('pause').execute(Discord, msg, streamURL, embedColor)
  else if (command === 'resume') client.commands.get('resume').execute(Discord, msg, streamURL, embedColor)
  else if (command === 'stop') client.commands.get('stop').execute(Discord, msg, streamURL, embedColor)
  else if (command === 'invite') client.commands.get('invite').execute(Discord, msg, botName, inviteURL, embedColor)
  else if (msg.content.startsWith(prefix)) return msg.channel.send('Incorret Ccommand!');
});

client.login(token);
