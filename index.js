require('dotenv').config();
const discord = require('discord.js');
const { token } = process.env;
const client = new discord.Client({
	intents: [
		discord.GatewayIntentBits.DirectMessages,
		discord.GatewayIntentBits.Guilds,
		discord.GatewayIntentBits.GuildBans,
		discord.GatewayIntentBits.GuildMessages,
		discord.GatewayIntentBits.MessageContent,
	],
	partials: [discord.Partials.Channel],
});

client.commands = []
client.buttons = []
client.selectMenus = []

require("./src/handlers/handleCommands")(client);
require("./src/handlers/handleEvents")(client);
require("./src/handlers/handleComponents")(client);

client.login(token);
