import { Client, PartialMessage, Message } from 'discord.js'

import logger from './logger'
import postToSlackWebhook from './slack'
import users from './users'

const CMD_PREFIX = '!'
const MSG_PREFIX = `Beep Boop 👋🤖🤙`

export async function getDiscordClient(): Promise<Client> {
  const client = new Client()

  client.once('ready', () => {
    logger.info('Successfully started the Discord Client')
  })

  client.on('message', handleMessages)

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN)
  } catch (err) {
    logger.error(`Unable to log into Discord. ${err.message}`, err)
  }

  return client
}

function handleMessages(message: Message | PartialMessage): void {
  const discordAuthorUsername = message.author?.username as string
  const discordUserName = (message.member?.nickname as string) || discordAuthorUsername
  const discordUser: string = users[discordAuthorUsername] ?? discordUserName

  const msgIsGreeting = message.content?.includes('butler')
  if (msgIsGreeting) {
    const preparedMessage = `${MSG_PREFIX} - Welcome to Virtual Hangs ${discordUser}`
    message.channel?.send(preparedMessage)
  }

  if (!message.content?.startsWith(CMD_PREFIX) || message.author?.bot) return
  const args = message.content.slice(CMD_PREFIX.length).split(' ')
  const command = args.shift()?.toLowerCase()

  if (command === Commands.Notify) {
    if (args.length > 0) {
      const slackMessage = `${discordUser} says "${args.join(' ')}"`
      message.channel?.send(
        `${MSG_PREFIX} - I'll notify your friends in slack that ${discordUser} says "${slackMessage}."`
      )

      postToSlackWebhook({ slackMessage })
        .then(() => {
          logger.info(`${discordUser} sent POST to slack webhook containing message '${slackMessage}'`)
        })
        .catch(err => {
          logger.error(`Unable to POST '${slackMessage}'to slack webhook for user '${discordUser}'`, err.message)
        })
    } else {
      const slackMessage = `${discordUser} has come online. Join them and chat!`
      message.channel?.send(
        `${MSG_PREFIX} - Hey ${discordUser}! I'll notify your friends in slack that you've come online.`
      )

      postToSlackWebhook({ slackMessage })
        .then(() => {
          logger.info(`${discordUser} sent POST to slack webhook containing message '${slackMessage}'`)
        })
        .catch(err => {
          logger.error(`Unable to POST '${slackMessage}' to slack webhook for user '${discordUser}'.`, err.message)
        })
    }
  }
}

enum Commands {
  Notify = 'notify'
}
