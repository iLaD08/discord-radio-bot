module.exports = {
    name: 'stop',
    description: 'Radio bot stop command.',
    async execute(Discord, msg, streamURL, embedColor) {
        if (!msg.member.voice.channel) return message.channel.send("**:x: You must be in a voice channel to use this command.**");

        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(streamURL);

        connection.disconnect();

        const stopEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(":stop_button: **Stopped!**");
        msg.channel.send(stopEmbed);
    }
}

