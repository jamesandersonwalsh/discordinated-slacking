# discordinated-slacking

![](https://github.com/jimboslicethat/discordinated-slacking/workflows/Build%20Test%20&%20Publish/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.png?v=102)](https://opensource.org/licenses/GPL-3.0/)

An integration between discord and slack using webhooks and discord bots.

## Core Dependency 🤖

This package's core dependency is [Discord.js](https://discordjs.guide/)

## Usage

- No NPM package at this time, but is under heavy consideration.

## Development

### Getting started 🖥

1. [Install Yarn](https://yarnpkg.com/getting-started)
2. Install dependencies

```sh
yarn
```

3. Setup Bots:
   - If you are working with contributors directly then _ask us for slack/discord bot secrets_, and skip the other bullet points. _(Continue to step 4)_.
   - If you are leveraging this package to setup your own discord -> slack bot you will first need to go manually setup your server bots.
     - One discord bot that can be used by `Discord.js`
     - One slack bot that is configured for "Incoming Webhooks".
4. From the root directory create a new dotenv configuration _(This will contain secrets so it is not checked into Git)_.
   - From the root directory `touch .env`
   - Add your discord bot **token** and your slack **webhook url** to `.env.` _Please refer to .env.example file checked into GitHub_.

### To Run in Development

```sh
npm run start:dev
```

### To Run in Production

```sh
npm run build && npm run start
```

## Maintaining 🛠

#### Useful links

- [Discord.js Docs](https://discord.js.org/#/docs/main/master/general/welcome)
- [Slack Webhook Documentation](https://api.slack.com/messaging/webhooks)

#### Viewing Heroku Logs

1. [Install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. Run the following:

```sh
heroku login
```

```sh
heroku logs -t --force-colors -a discordinated-slacking
```

## CI/CD 🚀

1. This Project uses [GitHub Actions](https://help.github.com/en/actions) for building, testing & publishing _(in the future)_.
1. Our contributors private instance of the bot is hosted on Heroku and gets deployed once all GitHub actions have completed.
