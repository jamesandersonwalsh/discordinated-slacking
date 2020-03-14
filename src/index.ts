/* eslint-disable import/first */
import { config } from 'dotenv'
config()

import * as discord from './discord'

async function execute(): Promise<void> {
  await discord.getDiscordClient()
}

execute().catch((err: Error) => {
  console.error(`discordinated-slacking server failed to start up due to ${err.message}`, err)
})
