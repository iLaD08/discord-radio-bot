module.exports = {
    name: 'invite',
    description: 'Radio bot invite command.',
    async execute(Discord, msg, botName, inviteURL, embedColor) {
        const supportEmbed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle(`Click me to invite ${botName} to your server!`)
            .setURL(inviteURL)
            .setFooter(
                `Requested by ${msg.author.username}`,
                msg.author.displayAvatarURL()
            );
        msg.channel.send(supportEmbed);
    }
};

