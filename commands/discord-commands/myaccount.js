const { MessageEmbed } = require("discord.js");

const config = require('../../settings.json');
let account = require('../../database/account.json');

module.exports.run = async (client, JKCJrBot, JKCSupBot, message, args) => {
    let account = await prisma.user.findUnique({
        where: {
            discord_id: message.author.id
        }
    })
    if (!account) {
        account = await prisma.user.create({
            data: {
                discord_id: message.author.id,
                discord_name: message.author.username
            }
        })
    }
    return message.channel.send({
        embeds: [new MessageEmbed()
            .setTitle(`🤑บัญชีของ ${message.author.username}🤑`)
            .setDescription(` - ตอนนี้คุณ ${message.author.username} มีเงินอยู่ :dollar: ${account[message.author.id].amount} แหน่ะ`)
            .setThumbnail(client.user.displayAvatarURL()).setColor('#FFD157')
            .setFooter(client.user.username + ' | Version ' + config.version, client.user.displayAvatarURL())]
    });
}

module.exports.config = {
    name: 'myaccount',
    aliases: ['account']
}
