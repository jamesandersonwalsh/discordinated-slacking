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
    const slackMessage = `Hi there 🎤! ${discordUser} has joined the audio channel #${DISCORD_AUDIO_CHANNEL}`
    postToSlackWebhook({ slackMessage })
      .then(() => {
        logger.info(`${discordUser} has joined ${DISCORD_AUDIO_CHANNEL}`)
      })
      .catch(err => {
        logger.error(`Unable to POST '${slackMessage}'to slack webhook for user '${discordUser}'`, err.message)
      })
  }

  if (oldChannelIsDiscordAudioChannel && channelHasNotChanged) {
    const slackMessage = `Signing off 👋! ${discordUser} has left the audio channel #${DISCORD_AUDIO_CHANNEL}`
    postToSlackWebhook({ slackMessage })
      .then(() => {
        logger.info(`${discordUser} has left ${DISCORD_AUDIO_CHANNEL}`)
      })
      .catch(err => {
        logger.error(`Unable to POST '${slackMessage}'to slack webhook for user '${discordUser}'`, err.message)
      })
  }
}
