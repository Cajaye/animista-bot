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

const date = new Intl.DateTimeFormat("en-US").format(new Date())

require('dotenv').config();
let url = `https://animechan.vercel.app/api/`
const axios = require('axios').default;
const { Client, Intents, MessageEmbed } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on("interactionCreate", async interaction => {
    try {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'quote' || interaction.commandName === "animista") {
            const res = await axios.get(`${url}random`);
            if (res.status == 404) {
                return interaction.reply(`Try again`);
            }
            const { anime, character, quote } = res.data;
            const message = new MessageEmbed()
                .setColor('#0099ff').setTitle('Animista')
                .setDescription('Get a random anime quote')
                .setTimestamp().addFields({ name: "Anime", value: anime }, { name: "Character", value: character }, { name: "Quote", value: quote })
            await interaction.reply({ embeds: [message] });
        }
    } catch (error) {
        let msg = 'There was an error while executing this command!'
        console.error(error);
        await interaction.reply({ content: msg, ephemeral: true });
    }
});

client.login(process.env.DISCORD_TOKEN);
