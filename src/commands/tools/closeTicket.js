const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fecharticket")
    .setDescription("Fecha o ticket"),
  async execute(client, interaction) {
    if (interaction.channel.name.includes(interaction.user.id)) {
      await interaction.reply({
        content: `O ticket foi arquivado por: ${interaction.user.username}! `,
        ephemeral: true,
      });
      await interaction.channel.setArchived(true);
    } else {
      await interaction.reply({
        content: `Você não tem permissão para fechar este ticket!`,
        ephemeral: true,
      });
    }
  },
};
