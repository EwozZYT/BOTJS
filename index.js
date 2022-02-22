const { Client, Collection } = require("discord.js");
const client = new Client({intents: 1});
const { Token } = require("./config.json");

require("./Handlers/Events")(client);
client.command = new Collection()

client.login(Token)