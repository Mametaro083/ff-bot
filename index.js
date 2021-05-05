require('@keyv/redis')
require('@keyv/mongo')
require('@keyv/sqlite')
require('@keyv/postgres')
require('@keyv/mysql')

const discord = require('discord.js')
const client = new discord.Client()
const Keyv = require('keyv')
const keyv = new Keyv
const prefixes = new Keyv('sqlite://data//prefixes.sqlite')
const { globalPrefix , token } = require('./data/config.json')
const func = require('./data/func.js')

keyv.on('error' , e => console.error(`an keyv error: ${error}`))

client.on('ready' , async () => {
  console.log('ready')
  client.user.setPresence({
    activity: {
      name: `${globalPrefix}help｜ff bot`
    }
  })
})

let prefix
client.on('message' , async message => {
  if (message.author.bot) return;
  freeCh(message , func.codeFunc , freeCh_key)
  const guildPrefix = await prefixes.get(message.guild.id)
  if (message.content.startsWith(globalPrefix)) {
    if (guildPrefix !== globalPrefix&&guildPrefix !== undefined) return;
    prefix = globalPrefix
  } else if (message.content.startsWith(guildPrefix)) {
    prefix = guildPrefix
  }
  if (!message.content.startsWith(prefix)) return; 
  const args = message.content.slice(prefix.length).split(' ')
  const command = args.shift().toLowerCase()
  switch(command) {
    case 'avatar' :
    avatar(client , message , args)
    break;
    case 'del' :
    del(message , func.codeFunc)
    break;
    case 'gg' :
    gg(message , args , func.codeFunc , func.urlComp , serp , request)
    break;
    case 'help' :
    help(message , args , func.codeFunc , prefix , freeCh_key)
    break;
    case 'math' :
    math(message , args , mathFunc)
    break;
    case 'lock' :
    lock(message , args , func.codeFunc)
    break;
    case 'ping' :
    ping(message , client , func.codeFunc)
    break;
    case 'settings' :
    settings(message , args , func.codeFunc , guildPrefix , prefixes , globalPrefix)
    break;
    case 'timer' :
    timer(message , args , func.codeFunc)
    break;
    case 'translate' :
    case 'tl' :
    tl(message , args , func.codeFunc , fetch)
    break;
  }
})

client.login(token)
