# discordinated-slacking

![](https://github.com/jimboslicethat/discordinated-slacking/workflows/Build%20Test%20&%20Publish/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.png?v=102)](https://opensource.org/licenses/GPL-3.0/)

An integration between discord and slack using webhooks and discord bots.

## Core Dependency 🤖

This package's core dependency is [Discord.js](https://discordjs.guide/)

## Getting started 🖥

- Install & run yarn
- Create a `.env` file add the necessary secrets. See the `.env.example` file checked into GitHub
  for the list of example secrets.

## Usage ⌨️

#### To Run in Development

```sh
npm run start:dev
```

#### To Run for Production

```sh
npm run build && npm run start
```

## Maintaining 🛠

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
