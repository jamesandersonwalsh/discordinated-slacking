import { VoiceState } from 'discord.js'
import * as R from 'ramda'

import logger from '../logger'
import postToSlackWebhook from '../slack'
import users from '../users'

const { DISCORD_AUDIO_CHANNEL } = process.env

export default function handleVoiceState(oldState: VoiceState, newState: VoiceState): void {
  if (R.isNil(DISCORD_AUDIO_CHANNEL)) {
    logger.error('You must provide a process.env.DISCORD_AUDIO_CHANNEL to sync with slack')
    process.exit(1)
  }

  const { channel: oldChannel } = oldState
  const { channel: newChannel } = newState

  const discordUserName = (newState.member?.nickname as string) || (newState.member?.user.username as string)
  const discordUser = users[discordUserName] ?? discordUserName

  const oldChannelIsDiscordAudioChannel = oldChannel?.name === DISCORD_AUDIO_CHANNEL
  const newChannelIsDiscordAudioChannel = newChannel?.name === DISCORD_AUDIO_CHANNEL

  const channelHasNotChanged = newChannelIsDiscordAudioChannel !== oldChannelIsDiscordAudioChannel

  if (R.and(!oldChannelIsDiscordAudioChannel, !newChannelIsDiscordAudioChannel)) {
    logger.info(`${discordUser} joined a different channel other than ${DISCORD_AUDIO_CHANNEL}`)
    return
  }

  if (newChannelIsDiscordAudioChannel && channelHasNotChanged) {
    const greetingMessage = GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)]
    const slackMessage = `${greetingMessage}\n${discordUser} has joined the audio channel #${DISCORD_AUDIO_CHANNEL}`
    postToSlackWebhook({ slackMessage })
      .then(() => {
        logger.info(`${discordUser} has joined ${DISCORD_AUDIO_CHANNEL}`)
      })
      .catch(err => {
        logger.error(`Unable to POST '${slackMessage}'to slack webhook for user '${discordUser}'`, err.message)
      })
  }

  if (oldChannelIsDiscordAudioChannel && channelHasNotChanged) {
    const goodbyMessage = GOODBYE_MESSAGES[Math.floor(Math.random() * GOODBYE_MESSAGES.length)]
    const slackMessage = `${goodbyMessage} ${discordUser} has left the audio channel #${DISCORD_AUDIO_CHANNEL}`
    postToSlackWebhook({ slackMessage })
      .then(() => {
        logger.info(`${discordUser} has left ${DISCORD_AUDIO_CHANNEL}`)
      })
      .catch(err => {
        logger.error(`Unable to POST '${slackMessage}'to slack webhook for user '${discordUser}'`, err.message)
      })
  }
}

const GREETING_MESSAGES = [
  'Hi there 🎤!',
  'Come here often 😏?',
  `Uh oh... here come's trouble...`,
  'Now remotely installing virus.exe...',
  'So I guess theyll just let anyone in here then huh?',
  'Come on in the water is great!'
]

const GOODBYE_MESSAGES = [
  'Signing off 👋!',
  'In a while 🐊...',
  `See ya, wouldn't wanna be ya`,
  'Time for me to make like a tree and scram.'
]
