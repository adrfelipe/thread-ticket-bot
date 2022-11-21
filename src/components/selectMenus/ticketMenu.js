const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");
require("dotenv").config();
const { ticketChannelId } = process.env;
const ticketEmbed = require("../embed/ticketEmbed");

module.exports = {
  data: {
    name: "ticket",
  },
  async execute(client, interaction) {
    await interaction.update({ fetchReply: true });

    const channel = interaction.guild.channels.cache.get(ticketChannelId);

    const ticketChannelName = `${interaction.user.username} (${interaction.user.id})`;

    let thread ,
        threads = [];

    channel.threads.cache.map((threadChannel) => {
      if (threadChannel.name == ticketChannelName) {
        thread = threadChannel;
        threads.push(thread.name);
      }
    });

    if (interaction.values[0] === "Fazer uma denúncia") {
      await interaction.followUp({
        content: "Denúncias não estão disponíveis no momento.",
        ephemeral: true,
      });
      return;
    }

    if (!thread) {
      return interaction.channel.threads
        .create({
          name: ticketChannelName,
          autoArchiveDuration: 60,
          type: ChannelType.GuildPrivateThread,
          reason: `Motivo do ticket: ${interaction.values[0]}`,
        })

        .then(async (thread) => {
          thread.members.add(interaction.user.id);
          interaction.followUp({
            content: `Criei um ticket pra você em: <#${thread.id}>`,
            ephemeral: true,
          });

          thread.send({
            embeds: [ticketEmbed(interaction)],
          });

          thread.setInvitable(
            false,
            "Proibindo outras pessoas além de moderadores a participarem da thread."
          );
        });
    } else if (thread.archived) {
      thread.setArchived(false);
      interaction.followUp({
        content: `Seu ticket foi reaberto em: <#${thread.id}>`,
        ephemeral: true,
      });
    } else {
      interaction.followUp({
        content: `Você já possui um ticket aberto! Acesse em <#${thread.id}>`,
        ephemeral: true,
      });
    }
  },
};
