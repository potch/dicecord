# dicecord

bare-bones dice-rolling discord bot.

## Setup

- requires Node LTS and npm
- `npm install` to get needed dependencies
- copy `.env.sample` to `.env`
- [create a discord application](https://discord.com/developers/applications)
- add a Bot user to the application
- copy the application's client ID and the bot's auth token into `.env`
- `npm start` to start the bot
- when running successfully, will log the URL to install the bot on your server

## Dice Syntax

the bot watches for messages starting with `/r `. Here are some examples:

- `/r d20` - roll a d20 die
- `/r 2d6` - roll 2 d6 dice, and return the sum of the rolls
- `/r 2d8 + 3` - roll 2 d8 dice and add 3 to the sum of the rolls
- `/r 2d6k1` - roll 2 d6, and keep only the highest roll
- `/r 3d20k-1` - roll 3d20 and return only the _lowest_ roll.
- `/r 10d4k-3 + 5` - roll 10 d4, keep only the lowest 3 rolls, and add 5 to the result

limited to a max of 20 dice, and dice with 1000 sides
