require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { checkUserExists, createUser, isUsersFull } = require('../utils/users');

const server = express();

server.use(cors());

const {
  Client,
  Intents,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const { guildId, roleId } = require('../config/config');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
  console.log('FA Bot is online');

  client.user.setPresence({
    activities: [{ name: 'FA Bot', type: 'WATCHING' }],
    status: 'online',
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === '300') {
    const { user } = interaction;

    const { isFull } = await isUsersFull(300);

    if (isFull) {
      interaction.reply(`Sorry. The 300 role is full`);
      return;
    }

    const button = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Verify')
        .setURL(`${process.env.NEXT_PUBLIC_HOST}/verify/${user.id}`)
        .setStyle('LINK')
    );

    await interaction.reply({
      content:
        'To get the 300 role you first have to verify your YouTube subscription',
      components: [button],
    });

    const existingUser = await checkUserExists(user.id);

    if (!existingUser) {
      await createUser({
        discord_id: user.id,
      });
    }

    // Remove the link after 10 seconds
    setTimeout(() => {
      interaction.deleteReply();
    }, 10000);
  }
});

// This handles the role add/remove
server.post('/set-role/:user_id', async (req, res) => {
  const userId = req.params?.user_id;
  const isSubscribedString = req.query?.isSubscribed;
  const isSubscribed =
    isSubscribedString === 'true' || isSubscribedString === 'false'
      ? JSON.parse(isSubscribedString)
      : null;

  try {
    if (userId && isSubscribed !== null) {
      const guild = await client.guilds.fetch(guildId);
      const guildMember = await guild.members.fetch(userId);

      if (isSubscribed) {
        await guildMember.roles.add([roleId], 'Subscribed to the channel');
      } else {
        await guildMember.roles.remove(
          [roleId],
          'Unsubscribed from the channel'
        );
      }

      return res.status(200).json({
        success: true,
        message: 'Roles have been handled',
      });
    }
  } catch (error) {
    console.log();
    return res.status(400).json({
      success: false,
      error,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

server.listen(process.env.EXPRESS_PORT || 3005, () => {
  console.log('Express up and running');
});
