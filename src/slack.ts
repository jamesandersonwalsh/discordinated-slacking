import axios, { AxiosResponse } from 'axios'

const { SLACK_BASE_URL } = process.env

export interface PublishToSlackParams {
  slackMessage: string
}

const slackApi = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

export default async function postToSlackWebhook(params: PublishToSlackParams): Promise<AxiosResponse> {
  const { slackMessage } = params
  const slackPost = {
    text: slackMessage,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: slackMessage
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '<https://discord.gg/H4beabK|Join them on Discord>'
        }
      }
    ]
  }

  return slackApi.post(SLACK_BASE_URL as string, slackPost)
}
