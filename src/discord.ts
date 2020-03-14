import { Client, PartialMessage, Message } from 'discord.js'

const CMD_PREFIX = '!'
const MSG_PREFIX = `Beep Boop 👋🤖🤙`

export async function getDiscordClient(): Promise<Client> {
  const client = new Client()

  client.once('ready', () => {
    console.info('Successfully started the Discord Client')
  })

  client.on('message', handleMessages)

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN)
  } catch (err) {
    console.error(`Unable to log into Discord. ${err.message}`, err)
  }

  return client
}


function handleMessages(message:Message|PartialMessage) : void {
  const msgIsGreeting = message.content?.includes('butler')
  if (msgIsGreeting) {
    message.channel?.send(`${MSG_PREFIX} - Welcome to Virtual Hangs ${message.member?.nickname}`)
  }

  if (!message.content?.startsWith(CMD_PREFIX) || message.author?.bot) return
  const args = message.content.slice(CMD_PREFIX.length).split(' ')
  const command = args.shift()?.toLowerCase()
  
  if (command === Commands.Notify) {
    if (args) {
      message.channel?.send(`${MSG_PREFIX} - I'll notify your friends in slack that ${message.member?.nickname} says '${args.join(' ')}' :call_me: `)
    } else {
      message.channel?.send(`${MSG_PREFIX} - Hey ${message.member?.nickname}! I'll notify your friends in slack that you've come online :call_me:`)
    }
  }
}

enum Commands {
  Notify = 'notify'
}
