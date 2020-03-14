import { Client, PartialMessage, Message } from 'discord.js'

export async function getDiscordClient(): Promise<Client> {
  const client = new Client()

  client.once('ready', () => {
    console.log('Successfully started the Discord Client')
  })

  client.on('message', msg => {
    const parsedMessage = parseMessage(msg)
    if (parsedMessage.includes('butler')) {
      msg.channel?.send(`Welcome to Virtual Hangs ${msg.member?.user}`)
    }
  })

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN)
  } catch (err) {
    console.error(`Unable to log into Discord. ${err.message}`, err)
  }

  return client
}

function parseMessage(message: Message | PartialMessage): string {
  if (message.content) {
    return message?.content.toLowerCase()
  } else {
    return (message as unknown) as string
  }
}
