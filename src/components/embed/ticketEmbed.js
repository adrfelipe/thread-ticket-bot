const { EmbedBuilder } = require("discord.js");
require("dotenv").config();
const ticketButtons = require("../buttons/ticketButtons");

function ticketEmbed(interaction) {
  const attendance = ticketButtons();
  console.log(attendance.components[1]);
  return new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(`<:seta:1044825337609068605> Seu ticket foi criado com sucesso!`)
    .setAuthor({
      name: `Atendimento | PAGOT`,
      iconURL:
        "https://cdn.discordapp.com/icons/903890619691323413/a_7cbbac541173afc77052d470d78306f3.gif?size=2048",
    })
    .setDescription(`<:verify:1044825144658509844> Somente você e a equipe da staff tem acesso à este canal.\n
      > Olá <@${interaction.user.id}>, este é seu ticket!\n
      > Todos os <@&952597579357626368> já estão ciente de seu ticket, **__aguarde__** que em breve algum membro de nossa equipe irá iniciar seu atendimento!\n
      > Enquanto isso, **descreva com detalhes** o motivo de sua denúncia ou reclamação.\n
      **__Categoria selecionada:__**
      \`\`\`js\n"${interaction.values[0]}"\`\`\`\n
      ${attendance ? `**Atendimento iniciado por:**\n${attendance}` : ""}
      `);
}

module.exports = ticketEmbed;
