const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  await client.user.setStatus("dnd");
  client.application.commands
    .set(client.commands.map((command) => command.data))
    .then(() =>
      console.log(
        `💠 | [Slash Commands] Comandos carregados em todas guilds.\n`
      )
    )
    .catch(() => console.log(`🚨 | [Erro] Falha ao carregar os comandos.`));

  const status = [
    "🥇 Entre em nosso \n server: https://discord.com/invite/pagot.",
    "💌 Contato: \n adrfelipe.sz@gmail.com.",
    "🔨 As melhores \n modificações para seu servidor estão aqui.",
  ];

  i = 0;
  client.user.setActivity(status[0]);
  setInterval(
    () =>
      client.user.setActivity(`${status[i++ % status.length]}`, {
        type: "PLAYING",
      }),
    1000 * 60 * 15
  );
  client.user.setStatus("dnd");

  console.log(
    `👥 | [Estatísticas] ${client.guilds.cache.size.toLocaleString()} servidores | ${client.guilds.cache
      .map((g) => g.memberCount)
      .reduce((x, f) => x + f, 0)
      .toLocaleString()} usuários\n🤖 | [Bot] Conectado em ${client.user.tag}.`
  );

  console.log(`💠 | [Slash Commands] Iniciando deploy em todas guilds.\n`);
};
