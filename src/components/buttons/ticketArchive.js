module.exports = {
  data: {
    name: "ticketArchive",
  },
  async execute(client, interaction) {
    console.log(interaction);
    await interaction.thread.setArchived(true);
  },
};
