module.exports = {
    name: 'volume',
    description: 'Radio bot volume command.',
    async execute(Discord, msg, args, streamURL, embedColor) {
        if (!msg.member.voice.channel) return msg.channel.send("**:x: You must be in a voice channel to use this command.**");
        if (!args[0]) return msg.channel.send(`\`${prefix}volume\` **0-100**`);

        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(streamURL);

        dispatcher.setVolume(args[0]); 

        const radioEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`:loud_sound: **Volume: \`${args[0]}\`**`)
        msg.channel.send(radioEmbed);
    }
};

