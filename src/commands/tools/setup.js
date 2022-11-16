const {
  ActionRowBuilder,
  SlashCommandBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");
const { ticketChannelId } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Inicia o sistema de tickets por Threads"),

  async execute(client, interaction) {
    if (interaction.channel.type === "DM") return;
    if (!interaction.member.permissions.has("ADMINISTRATOR"))
      return interaction.reply({
        content: "Você não tem permissão para usar este comando!",
        ephemeral: true,
      });

    const ticketChannel = client.channels.cache.get(ticketChannelId);

    const ticketEmbed = new EmbedBuilder()
      .setColor(0x7289da)
      .setTitle("Central de ajuda | PAGOT")
      .setImage(
        "https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5"
      )
      .setDescription(
        "Nessa seção, você pode tirar suas dúvidas ou entrar em contato com a nossa equipe da PAGOT. Para isso, basta selecionar a categoria que deseja abaixo!"
      )
      .setFooter({
        text: `Developed by: ${interaction.guild.name} © 2022`,
        iconURL:
          "https://cdn.discordapp.com/icons/903890619691323413/a_7cbbac541173afc77052d470d78306f3.gif?size=2048",
      });

    const selectMenuTicket = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("ticket")
        .setPlaceholder("Selecione uma categoria")
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions(
          {
            label: "Tirar dúvidas",
            value: "Tirar dúvidas",
            emoji: "🔧",
          },
          {
            label: "Fazer uma denúncia",
            value: "Fazer uma denúncia",
            emoji: "🚨",
          }
        )
    );

    await interaction.reply({
      embeds: [ticketEmbed],
      components: [selectMenuTicket],
    });
  },
};
