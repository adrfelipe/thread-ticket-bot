const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

function ticketEmbed (interaction) {
  return new EmbedBuilder()
    .setColor(0x2f3136)
    .setAuthor({
      name: `Atendimento | PAGOT`,
      iconURL:
        "https://cdn.discordapp.com/icons/903890619691323413/a_7cbbac541173afc77052d470d78306f3.gif?size=2048",
    })
    .setDescription(`Motivo do ticket: ${interaction.values[0]}`);
}

module.exports = ticketEmbed;
