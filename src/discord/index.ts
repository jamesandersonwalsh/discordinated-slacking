import { Client } from 'discord.js'

import logger from '../logger'
import handleMessages from './handle-messages'

export async function getDiscordClient(): Promise<Client> {
  const client = new Client()

  client.once('ready', () => {
    logger.info('Successfully started the Discord Client')
  })

  client.on('message', handleMessages)

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN)
  } catch (err) {
    logger.error(`Unable to log into Discord.`, err)
  }

  return client
}
