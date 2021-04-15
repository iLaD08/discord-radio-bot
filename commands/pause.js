module.exports = {
    name: 'pause',
    description: 'Radio bot pause command.',
    async execute(Discord, msg, streamURL, embedColor) {
        if (!msg.member.voice.channel) return msg.channel.send("**:x: You must be in a voice channel to use this command.**");

        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(streamURL);

        dispatcher.destroy();

        const pauseEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(":pause_button: **Paused!**");

        msg.channel.send(pauseEmbed);
    }
}

