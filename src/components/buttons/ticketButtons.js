const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  DiscordAPIError,
} = require("discord.js");
require("dotenv").config();
const { staffRole } = process.env;
const ticketEmbed = require("../embed/ticketEmbed");

function ticketButtons(interaction) {
  switch (interaction.customId) {
    case "archiveTicket":
      if (interaction.channel.name.includes(interaction.user.id)) {
        interaction.reply({
          content: `O ticket foi arquivado por': ${interaction.user.username}! `,
          ephemeral: true,
        });
        interaction.channel.setArchived(true);
      } else {
        interaction.reply({
          content: `Você não tem permissão para fechar este ticket!`,
          ephemeral: true,
        });
      }
      break;

    case "claimTicket":
      if (!interaction.member.roles.cache.has("997987655209980015")) {
        interaction.reply({
          ephemeral: true,
          content: `Você não tem permissão para assumir este ticket!`,
        });
      } else {
        const oldTicket = interaction.message.embeds[0];
        const ticketClaimed = EmbedBuilder.from(oldTicket).setFields({
          name: "Atendimento iniciado por:",
          value: interaction.user.toString(),
          //`<@${interaction.user.id}>`
        });

        interaction.message.edit({
          embeds: [ticketClaimed],
        });

        interaction.reply;
        const ticketOwner = new EmbedBuilder()
          .setDescription(
            `O ticket foi assumido por: ${interaction.user.toString()}`
          )
          .setColor(0x2f3136);

        interaction.reply({
          ephemeral: false,
          embeds: [ticketOwner],
        });
      }
      break;

    case "staffCommands":
      if (interaction.member.roles.cache.has("997987655209980015")) {
        interaction.reply({
          content: `Staff commands funcionando`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: `Você não tem permissão para isso!`,
          ephemeral: true,
        });
      }
      break;

    default:
  }

  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("archiveTicket")
      .setLabel("Fechar ticket")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("staffCommands")
      .setLabel("Comandos da Staff")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("claimTicket")
      .setLabel("Assumir ticket")
      .setStyle(ButtonStyle.Primary)
  );
}

module.exports = ticketButtons;
