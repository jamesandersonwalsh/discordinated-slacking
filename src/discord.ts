import { Client } from 'discord.js'

export async function getDiscordClient(): Promise<Client> {
  const client = new Client()

  client.once('ready', () => {
    console.log('Successfully started the Discord Client')
  })

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN)
  } catch (err) {
    console.error(`Unable to log into Discord. ${err.message}`, err)
  }

  return client
}
