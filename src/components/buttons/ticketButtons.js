const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

class ticket {
  static generate(interaction, attendance) {
    return [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("archiveTicket")
          .setLabel("Fechar ticket")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("claimTicket")
          .setLabel("Assumir ticket")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("staffCommands")
          .setLabel("Comandos da Staff")
          .setStyle(ButtonStyle.Danger)
      ),
      new EmbedBuilder()
        .setColor(0x2f3136)
        .setTitle(
          `<:seta:1044825337609068605> Seu ticket foi criado com sucesso!`
        )
        .setAuthor({
          name: `Atendimento | PAGOT`,
          iconURL:
            "https://cdn.discordapp.com/icons/903890619691323413/a_7cbbac541173afc77052d470d78306f3.gif?size=2048",
        })
        .setDescription(`<:verify:1044825144658509844> Somente você e a equipe da staff tem acesso à este canal.\n
      > Todos os **staffs** já estão ciente de seu ticket, **__aguarde__** que em breve algum membro de nossa equipe irá iniciar seu atendimento!\n
      **__Categoria selecionada:__**
      \`\`\`js\n"${interaction.values[0]}"\`\`\`
      ${
        attendance
          ? `**Atendimento iniciado por:**\n${attendance}`
          : ""
      }
      `),
    ];
  }

  static async execute(interaction) {
    switch (interaction.customId) {
      case "archiveTicket":
        if (interaction.channel.name.includes(interaction.user.id)) {
          interaction.reply({
            content: `O ticket foi arquivado por: ${interaction.user.username}! `,
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
        const attendance = interaction.user.username;

        console.log(this)
        interaction.update({
          embeds: [ticket.generate(interaction, attendance)[1]],
          components: [ticket.generate(interaction, attendance)[0]],
        });

        console.log(attendance);
        break;

      default:
    }
  }
}

module.exports = ticket;
