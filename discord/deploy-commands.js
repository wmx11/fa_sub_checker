require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { clientId, guildId } = require('../config/config');

const commands = [
  new SlashCommandBuilder()
    .setName('300')
    .setDescription(
      'Verfiy your subscription to Austin Clark to get access to the premium content'
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
