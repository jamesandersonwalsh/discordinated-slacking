import { Client, PartialMessage, Message } from 'discord.js'

import postToSlackWebhook from './slack'
import users from './users'

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

function handleMessages(message: Message | PartialMessage): void {
  const msgIsGreeting = message.content?.includes('butler')
  if (msgIsGreeting) {
    message.channel?.send(`${MSG_PREFIX} - Welcome to Virtual Hangs ${message.member?.nickname}`)
  }

  if (!message.content?.startsWith(CMD_PREFIX) || message.author?.bot) return
  const args = message.content.slice(CMD_PREFIX.length).split(' ')
  const command = args.shift()?.toLowerCase()

  if (command === Commands.Notify) {
    const discordUser: string = (message.member?.nickname as string) || (message.member?.user.tag as string)
    const discordToSlackUser: string = users[discordUser]

    if (args.length > 0) {
      const slackMessage = `${discordToSlackUser} says ${args.join(' ')}`
      message.channel?.send(
        `${MSG_PREFIX} - I'll notify your friends in slack that ${discordToSlackUser} says "${slackMessage}."`
      )

      postToSlackWebhook({ discordUser, slackMessage }).catch(err => {
        console.error('Unable to post to slack webhook.', err.message)
      })
    } else {
      const slackMessage = `${discordToSlackUser} has come online. Join them and chat!`
      message.channel?.send(
        `${MSG_PREFIX} - Hey ${discordUser}! I'll notify your friends in slack that you've come online.`
      )

      postToSlackWebhook({ discordUser, slackMessage }).catch(err => {
        console.error('Unable to post to slack webhook.', err.message)
      })
    }
  }
}

enum Commands {
  Notify = 'notify'
}
