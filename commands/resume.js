module.exports = {
    name: 'resume',
    description: 'Radio bot resume command.',
    async execute(Discord, msg, streamURL, embedColor) {
        if (!msg.member.voice.channel) return msg.channel.send("**:x: You must be in a voice channel to use this command.**");
        
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(streamURL);

        dispatcher.resume();

        const resumeEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(":play_pause: **Resumed!**");
        msg.channel.send(resumeEmbed);
    }
}

