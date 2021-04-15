module.exports = {
    name: 'help',
    description: 'Radio bot help command.',
    execute(Discord, msg, botName, prefix, embedColor) {
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
                `Requested by ${msg.author.username}`,
                msg.author.displayAvatarURL()
            );
        msg.channel.send(helpEmbed);
    }
}