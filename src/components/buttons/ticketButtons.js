const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

function ticketButtons(interaction) {
  // switch (interaction.customId) {
  //   case "archiveTicket":
  //     if (interaction.channel.name.includes(interaction.user.id)) {
  //       interaction.reply({
  //         content: `O ticket foi arquivado por: ${interaction.user.username}! `,
  //         ephemeral: true,
  //       });
  //       interaction.channel.setArchived(true);
  //     } else {
  //       interaction.reply({
  //         content: `Você não tem permissão para fechar este ticket!`,
  //         ephemeral: true,
  //       });
  //     }
  //     break;

  //   case "claimTicket":
  //     const attendance = interaction.user.username
  //     console.log(attendance);
  //     break;

  //   default:
  // }

  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("archiveTicket")
      .setLabel("Fechar ticket")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("claimTicket")
      .setLabel("Assumir ticket")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("staffCommands")
      .setLabel("Comandos da Staff")
      .setStyle(ButtonStyle.Secondary)
  );

}

module.exports = ticketButtons;
