    module.exports = {
    name: 'radio',
    description: 'Radio bot radio command.',
    async execute(Discord, msg, botName, streamURL, embedColor) {
        if (!msg.member.voice.channel) return msg.channel.send("**:x: You must be in a voice channel to use this command.**");

        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(streamURL);

        dispatcher.on("start", () => {
            const radioEmbed = new Discord.MessageEmbed()
                .setColor(embedColor)
                .setTitle(
                    `:musical_note: **Playing __${botName}__ in** \`${msg.member.voice.channel.name
                    }\`.`
                );
            msg.channel.send(radioEmbed);
        })
    }
};