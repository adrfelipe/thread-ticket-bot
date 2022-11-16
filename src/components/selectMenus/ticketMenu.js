const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: {
    name: "ticket",
  },
  async execute(client, interaction) {
    if (interaction.values[0] === "Tirar dúvidas") {
      const ticketChannelName = `${interaction.user.username} (${interaction.user.id})`;

      const ticketThread = await interaction.channel.threads
        .create({
          name: ticketChannelName,
          autoArchiveDuration: 60,
          type: ChannelType.PrivateThread,
          reason: `Motivo do ticket: ${interaction.values[0]}`,
        })
        .then(async (thread) => {
          thread.members.add(interaction.user.id);
          const ticketEmbed = new EmbedBuilder()
            .setColor(0x2f3136)
            .setAuthor({
              name: `Atendimento | PAGOT`,
              iconURL:
                "https://cdn.discordapp.com/icons/903890619691323413/a_7cbbac541173afc77052d470d78306f3.gif?size=2048",
            })
            .setDescription(`Motivo do ticket: ${interaction.values[0]}`);

          await interaction.reply({
            content: `Criei um ticket pra você em: <#${thread.id}>`,
            ephemeral: true,
          });

          await thread.send({
            embeds: [ticketEmbed],
          });
        });
    } else if (interaction.values[0] === "Fazer uma denúncia") {
      await interaction.reply({
        content: `Denúnias não estão disponíveis no momento!`,
        ephemeral: true,
      });
    }
  },
};
