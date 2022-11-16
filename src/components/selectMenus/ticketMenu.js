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
      const guild = client.guilds.cache.get(interaction.guild.id);
      const threadsChannels = guild.channels.cache.filter((t) => t.isThread());
      const ticketChannelName = `${interaction.user.username} (${interaction.user.id})`;

      for (const thread of threadsChannels.values()) {
        if (thread.name === ticketChannelName) {
          if (thread.archived) {
            await thread.setArchived(false);
          } else {
            return interaction.reply({
              content: `Você já possui um ticket aberto em <#${thread.id}>!`,
              ephemeral: true,
            });
          }
        } else {
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
        }
      }
    }

    if (interaction.values[0] === "Fazer uma denúncia") {
      await interaction.reply({
        content: `Denúnias não estão disponíveis no momento!`,
        ephemeral: true,
      });
    }
  },
};
