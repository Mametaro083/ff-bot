const discord = require('discord.js')

module.exports = del

async function del(message , codeFunc) {
  try {
    if (!message.channel.topic) return;
    if (!message.channel.topic.endsWith(message.author.id)&&!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(codeFunc('You don’t have permission.'))
    const embed = new discord.MessageEmbed()
    .setColor('GREEN')
    .setFooter(`Requested by ${message.author.tag}` , message.author.avatarURL())
    const standBy = await message.channel.send(embed
    .setTitle('**削除オプション**')
    .setAuthor('該当の番号を入力してください')
    .setDescription('1 -> キャンセル\n\n2 -> 削除する')
    )
    const filter = msg => msg.author.id === message.author.id
    const collected = await message.channel.awaitMessages(filter , {
      max: 1,
      time: 30000
    })
    const next = collected.first()
    if (!next) return standBy.edit(codeFunc('Timeout'))
    switch(next.toString()) {
      case '1' :
      standBy.edit(embed
      .setTitle('**キャンセル**')
      .setAuthor('')
      .setDescription('キャンセルしました')
      )
      break;
      case '2' :
      standBy.edit(embed
      .setTitle('**削除する**')
      .setAuthor('')
      .setDescription('5秒後に削除します...')
      )
      setTimeout(() => {
        message.channel.delete()
      }, 5000)
    }
  } catch(e) {
    console.error(e)
    message.channel.send(codeFunc(e))
  }
}
