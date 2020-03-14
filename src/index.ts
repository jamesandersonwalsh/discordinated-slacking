import { config } from 'dotenv'

import * as discord from './discord'

config()

async function execute(): Promise<void> {
  await discord.getDiscordClient()
}

execute().catch((err: Error) => {
  console.error(`discordinated-slacking server failed to start up due to ${err.message}`, err)
})
