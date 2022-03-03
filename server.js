process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----')
    console.log(error)
    console.log('----- Exception origin -----')
    console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----')
    console.log(promise)
    console.log('----- Reason -----')
    console.log(reason)
})

require('dotenv').config();
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

client.once('ready', () => {
    console.log('Ready!');
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        let msg = 'There was an error while executing this command!'
        console.error(error);
        await interaction.reply({ content: msg, ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
