const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

function ticketEmbed(interaction) {
  return new EmbedBuilder()
    .setColor(0x2f3136)
    .setTitle(`<:seta:1044825337609068605> Seu ticket foi criado com sucesso!`)
    .setAuthor({
      name: `Atendimento | PAGOT`,
      iconURL:
        "https://cdn.discordapp.com/icons/903890619691323413/a_7cbbac541173afc77052d470d78306f3.gif?size=2048",
    })
    .setDescription(`<:verify:1044825144658509844> Somente você e a equipe da staff tem acesso à este canal.\n
      > Todos os **staffs** já estão ciente de seu ticket, **__aguarde__** que em breve algum membro de nossa equipe irá iniciar seu atendimento!\n
      **__Categoria selecionada:__**
      \`\`\`js\n"${interaction.values[0]}"\`\`\``);
}

module.exports = ticketEmbed;
