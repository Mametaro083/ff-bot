const discord = require('discord.js')

module.exports = avatar

async function avatar(client , message , args) {
  const embed = new discord.MessageEmbed()
  .setColor('PURPLE')
  .setTitle('image link')
  .setFooter(`Requested by ${message.author.tag}` , message.author.avatarURL())
  if (!args[0]) return message.channel.send(embed
  .setURL(message.author.avatarURL())
  .setImage(message.author.avatarURL())
  )
  const member = await client.users.fetch(args[0])
  message.channel.send(embed
  .setURL(member.avatarURL())
  .setImage(member.avatarURL())
  )
}
