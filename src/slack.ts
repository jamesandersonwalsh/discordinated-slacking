import axios, { AxiosResponse } from 'axios'

const { SLACK_BASE_URL, SLACK_WEBHOOK_TOKEN } = process.env

export interface PublishToSlackParams {
  discordUser: string
  slackMessage: string
}

const slackApi = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

export default async function postToSlackWebhook(params: PublishToSlackParams): Promise<AxiosResponse> {
  const { discordUser, slackMessage } = params
  const slackPost = {
    text: `Virtually hang out with ${discordUser} on Discord.`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: slackMessage
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '[Go to Discord](https://discord.gg/H4beabK)'
        }
      }
    ]
  }

  return slackApi.post(SLACK_BASE_URL as string, slackPost)
}
