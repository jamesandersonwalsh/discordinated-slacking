/* eslint-disable import/first */
import { config } from 'dotenv'
config()

import * as discord from './discord'
import logger from './logger'

async function execute(): Promise<void> {
  await discord.getDiscordClient()
}

execute().catch((err: Error) => {
  logger.error(`discordinated-slacking server failed to start up due to ${err.message}`, err)
  process.exit(1)
})
