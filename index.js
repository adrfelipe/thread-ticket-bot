require("dotenv").config();
const discord = require("discord.js");

class Client extends discord.Client {
  constructor(options) {
    super(options);

    this.token = options.token;
    this.commands = [];
    this.buttons = [];
    this.selectMenus = [];
  }

  run() {
    require("./src/handlers/handleCommands")(client);
    require("./src/handlers/handleEvents")(client);
    require("./src/handlers/handleComponents")(client);
    this.login(this.token);
  }
}

const client = new Client({
  intents: [
    discord.GatewayIntentBits.DirectMessages,
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildBans,
    discord.GatewayIntentBits.GuildMessages,
    discord.GatewayIntentBits.MessageContent,
  ],
  partials: [discord.Partials.Channel],
  token: process.env.token,
});

client.run();
